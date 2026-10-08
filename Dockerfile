# syntax=docker/dockerfile:1

# Pin the Node major so a new LTS can't silently change the runtime.
# Build on glibc: musl's resolver fails (EAI_AGAIN) under next/font's ~400 parallel
# font downloads, stalling the build for minutes. The runtime stays on Alpine.
FROM node:24-slim AS build-base
ENV NEXT_TELEMETRY_DISABLED=1
# pnpm at the version pinned in package.json's packageManager.
RUN corepack enable pnpm

FROM node:24-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies only when the lockfile changes
FROM build-base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --store-dir /pnpm/store

# Build the standalone output
FROM build-base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build \
    # sharp's glibc binaries are installed for the build stage; Alpine only uses the musl ones.
    && rm -rf .next/standalone/node_modules/.pnpm/@img+sharp-linux-* \
              .next/standalone/node_modules/.pnpm/@img+sharp-libvips-linux-* \
              .next/standalone/node_modules/.pnpm/node_modules/@img/sharp-linux-* \
              .next/standalone/node_modules/.pnpm/node_modules/@img/sharp-libvips-linux-*

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
