export type DeerPose = 'stand' | 'walk' | 'leap' | 'graze' | 'look' | 'rest';

type DeerFigureProps = {
  pose: DeerPose;
  // Drawn facing right; flip to face left.
  flip?: boolean;
  className?: string;
};

// A side-view companion to the emblem: low-poly facets in ink on the page colour, built as a rig
// (body, neck → head → ear/antlers, four legs, tail) so poses and actions are just rotations.
// Pivots and pose transforms live in styles/deer-trail.css.

// Legs have a knee (fore) or hock (hind) so the lower half can fold.
const foreLeg = (
  <>
    <polygon points="114,84 128,88 126,114 118,114" />
    <g className="deer-fig__shin">
      <polygon points="118,114 126,114 125,146 119,148" />
      <polygon className="ink" points="118,145 126,145 127,150 117,150" />
    </g>
  </>
);

const hindLeg = (
  <>
    <polygon points="46,68 70,84 64,108 56,112 48,98" />
    <g className="deer-fig__shin">
      <polygon points="56,112 64,108 68,146 62,148" />
      <polygon className="ink" points="61,145 68,145 69,150 60,150" />
    </g>
  </>
);

const antler = (
  <>
    <polygon className="ink facet" points="147,15 155,13 149,-1 141,1" />
    <polygon className="ink facet" points="141,1 149,-1 141,-16 134,-12" />
    <polygon className="ink facet" points="134,-12 141,-16 140,-32 133,-30" />
    <polygon className="ink facet" points="133,-30 140,-32 147,-50" />
    <polygon className="ink facet" points="150,6 153,10 166,0" />
    <polygon className="ink facet" points="144,-5 147,0 159,-23" />
    <polygon className="ink facet" points="139,-21 141,-15 153,-38" />
  </>
);

const DeerFigure = ({ pose, flip, className }: DeerFigureProps) => (
  <svg
    viewBox="0 -70 200 230"
    className={['deer-fig', `deer-fig--${pose}`, flip && 'deer-fig--flip', className].filter(Boolean).join(' ')}
    aria-hidden="true"
    focusable="false"
  >
    <g className="deer-fig__body">
      <g className="deer-fig__leg deer-fig__leg--ff">
        <g transform="translate(-10 0)">{foreLeg}</g>
      </g>
      <g className="deer-fig__leg deer-fig__leg--hf">
        <g transform="translate(10 0)">{hindLeg}</g>
      </g>
      <g className="deer-fig__tail">
        <polygon points="40,62 29,69 39,73" />
      </g>
      {/* Behind the torso, with its base corners close to the pivot so they stay hidden inside the
          body: at any angle the neck grows out from under the shoulder. */}
      <g className="deer-fig__neck">
        <polygon points="110,64 140,22 124,76" />
        <polygon points="140,22 156,29 124,76" />
        <polygon className="ink" points="137,74 156,29 150,48" />
        <g className="deer-fig__head">
          <g transform="translate(148 25) scale(1.35) translate(-148 -25)">
            <g transform="rotate(-16 150 14) translate(-3 2)">{antler}</g>
            {antler}
            <polygon points="140,22 150,14 152,30 149,35" />
            <polygon points="150,14 160,16 152,30" />
            <polygon points="160,16 176,28 164,38 152,30" />
            <polygon className="ink" points="172,27 178,30 174,35" />
            <polygon className="ink" points="155,20 162,21 158,25" />
            <g className="deer-fig__ear">
              <polygon points="146,18 127,8 140,24" />
              <polygon className="ink" points="143,19 132,11 140,21" />
            </g>
          </g>
        </g>
      </g>
      <g className="deer-fig__torso">
        <polygon points="46,62 82,58 58,96" />
        <polygon points="46,62 58,96 38,78" />
        <polygon points="82,58 112,56 88,100" />
        <polygon points="82,58 88,100 58,96" />
        <polygon points="112,56 132,72 124,96" />
        <polygon points="112,56 124,96 88,100" />
        <polygon className="ink" points="38,78 58,96 47,92" />
        <polygon className="ink" points="88,100 124,96 108,103" />
      </g>
      <g className="deer-fig__leg deer-fig__leg--hn">{hindLeg}</g>
      <g className="deer-fig__leg deer-fig__leg--fn">{foreLeg}</g>
    </g>
  </svg>
);

export default DeerFigure;
