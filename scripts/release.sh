#!/usr/bin/env bash

# Build, verify, push and PIN the viltz.ee image.
#
# The deployment is managed by Pulumi (forgemaster-infra,
# pulumi/digitalocean/workloads/viltz.ts). This script owns everything up to and
# including the `siteImageTag` pin in that file, so a release is:
#
#     pnpm release
#     cd ~/Projects/fivexer/forgemaster-infra/pulumi && pulumi up
#
# Versioning (same scheme as fivexer's build-site.sh), most authoritative first:
#   1. an explicit version argument
#   2. the exact v* git tag on HEAD
#   3. v<package.json version>-<short-sha> for untagged builds
# Uncommitted trees are tagged by a content hash of the working tree
# (`git stash create`), so every distinct edit gets its own tag. A tag that is
# already on Docker Hub is not rebuilt (override with --force), but still pinned.
#
# Usage: pnpm release [version] [options]
#
#   --force        rebuild + repush even if the tag is already on Docker Hub
#   --build-only   build + verify locally; do not push, do not pin
#   --pin-only     skip build/push; just pin viltz.ts to the resolved tag
#   --no-pin       build + push, but leave viltz.ts alone
#   --skip-checks  skip typecheck + lint (escape hatch, not a habit)
#   --dry-run      print the plan and change nothing
#
# Env overrides:
#   IMAGE_REPO     viljarfivexer/viltz-ee
#   PULUMI_INFRA   ~/Projects/fivexer/forgemaster-infra

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGE_REPO="${IMAGE_REPO:-viljarfivexer/viltz-ee}"
PULUMI_INFRA="${PULUMI_INFRA:-$HOME/Projects/fivexer/forgemaster-infra}"
VILTZ_TS="$PULUMI_INFRA/pulumi/digitalocean/workloads/viltz.ts"
SMOKE_PORT="${SMOKE_PORT:-3999}"

VERSION_ARG=""
FORCE=false BUILD=true PUSH=true PIN=true CHECKS=true DRY_RUN=false
for arg in "$@"; do
    case "$arg" in
        --force) FORCE=true ;;
        --build-only) PUSH=false PIN=false ;;
        --pin-only) BUILD=false PUSH=false ;;
        --no-pin) PIN=false ;;
        --skip-checks) CHECKS=false ;;
        --dry-run) DRY_RUN=true ;;
        -h | --help) sed -n '3,/^set -euo/p' "$0" | sed '$d; s/^# \{0,1\}//'; exit 0 ;;
        -*) echo "unknown option: $arg" >&2; exit 2 ;;
        *) VERSION_ARG="$arg" ;;
    esac
done

step() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
warn() { echo "  ! $*" >&2; }
fail() { echo "error: $*" >&2; exit 1; }

# --- Resolve the version -----------------------------------------------------
PKG_VERSION="$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' "$ROOT/package.json" | head -1)"
DIRTY=false
if [ -n "$VERSION_ARG" ]; then
    VERSION="$VERSION_ARG"
else
    VERSION="$(git -C "$ROOT" describe --tags --exact-match --match 'v*' 2>/dev/null || true)"
    if [ -z "$VERSION" ]; then
        SHA="$(git -C "$ROOT" rev-parse --short HEAD)"
        WT="$(git -C "$ROOT" stash create 2>/dev/null || true)" # non-empty iff tracked changes
        if [ -n "$WT" ]; then
            DIRTY=true
            SHA="$(git -C "$ROOT" rev-parse --short "$WT")"
        fi
        VERSION="v${PKG_VERSION}-${SHA}"
    fi
fi
IMAGE="$IMAGE_REPO:$VERSION"

echo "image      : $IMAGE"
if $PIN; then echo "pin target : $VILTZ_TS"; fi

if $DIRTY; then
    warn "uncommitted changes: the tag hashes the working tree, not a commit."
    warn "  commit for a permanent, reproducible tag."
fi
if [ -n "$(git -C "$ROOT" ls-files --others --exclude-standard)" ]; then
    warn "untracked files are not part of the tag hash but ARE in the build context:"
    git -C "$ROOT" ls-files --others --exclude-standard | sed 's/^/      /' >&2
fi

if $PIN && [ ! -f "$VILTZ_TS" ]; then
    fail "$VILTZ_TS not found (set PULUMI_INFRA, or use --no-pin)"
fi

already_pushed() { docker buildx imagetools inspect "$IMAGE" >/dev/null 2>&1; }

if $DRY_RUN; then
    step "Dry run, nothing changed"
    if $BUILD; then
        if ! $FORCE && $PUSH && already_pushed; then
            echo "  $IMAGE is already on Docker Hub: would skip build + push"
        else
            echo "  would run: $($CHECKS && echo 'typecheck + lint, ')docker build, smoke test$($PUSH && echo ", push")"
        fi
    fi
    if $PIN; then echo "  would pin siteImageTag = \"$VERSION\" in $VILTZ_TS"; fi
    exit 0
fi

# --- Build, verify, push -----------------------------------------------------
SMOKE_CONTAINER="viltz-release-smoke-$$"
cleanup() { docker rm -f "$SMOKE_CONTAINER" >/dev/null 2>&1 || true; }
trap cleanup EXIT

smoke_test() {
    step "Smoke testing $IMAGE"
    docker run -d --name "$SMOKE_CONTAINER" -p "127.0.0.1:$SMOKE_PORT:3000" "$IMAGE" >/dev/null
    local base="http://127.0.0.1:$SMOKE_PORT" i
    for i in $(seq 1 30); do
        curl -fs -o /dev/null "$base/" && break
        [ "$i" = 30 ] && { docker logs "$SMOKE_CONTAINER" >&2; fail "container never answered on /"; }
        sleep 1
    done
    check() { # <label> <expected-status> <path> [curl args...]
        local label="$1" want="$2" path="$3"; shift 3
        local got
        got="$(curl -s -o /dev/null -w '%{http_code}' "$@" "$base$path")"
        [ "$got" = "$want" ] || { docker logs "$SMOKE_CONTAINER" >&2; fail "$label: $path returned $got, expected $want"; }
        echo "  ok  $label ($path -> $got)"
    }
    check "home page" 200 /
    check "service worker" 200 /sw.js
    check "image optimizer (sharp)" 200 "/_next/image?url=%2Fimages%2Fviljar.jpg&w=640&q=75" -H "Accept: image/webp"
    check "legacy /work redirect" 308 /work
    check "404 page" 404 /definitely-not-a-page
    cleanup
}

if $BUILD; then
    if ! $FORCE && $PUSH && already_pushed; then
        step "$IMAGE is already on Docker Hub, skipping build + push (--force to rebuild)"
    else
        if $CHECKS; then
            step "Typecheck + lint"
            (cd "$ROOT" && pnpm -s typecheck && pnpm -s lint)
        fi
        step "Building $IMAGE"
        docker build -t "$IMAGE" "$ROOT"
        smoke_test
        if $PUSH; then
            step "Pushing $IMAGE"
            docker push "$IMAGE"
        fi
    fi
fi

# --- Pin the tag in Pulumi ---------------------------------------------------
if $PIN; then
    step "Pinning siteImageTag = \"$VERSION\""
    # Never pin a tag that does not exist: `pulumi up` would roll pods into ImagePullBackOff.
    already_pushed || fail "$IMAGE is not on Docker Hub, refusing to pin it"
    read_pin() { sed -nE 's|^const siteImageTag = "([^"]*)";$|\1|p' "$VILTZ_TS" | head -1; }
    OLD="$(read_pin)"
    [ -n "$OLD" ] || fail "no 'const siteImageTag = \"...\";' line in $VILTZ_TS"
    if [ "$OLD" = "$VERSION" ]; then
        echo "  already pinned"
    else
        sed -i -E "s|^(const siteImageTag = \")[^\"]*(\";)$|\1$VERSION\2|" "$VILTZ_TS"
        [ "$(read_pin)" = "$VERSION" ] || fail "pin did not apply to $VILTZ_TS"
        echo "  $OLD -> $VERSION"
    fi
fi

step "Done"
echo "  image: $IMAGE"
if $PIN; then
    echo "  next:  cd $PULUMI_INFRA/pulumi && pulumi up"
fi
