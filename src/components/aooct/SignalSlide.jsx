import { useState } from 'react';
import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { signalSlide as copy } from '../../data/aoOctWalkthrough';

const WIDTH = 600;
const HEIGHT = 170;
const BASELINE = 88;

// A schematic, not a measured curve: the shapes come from hand-placed points in the data
// file. The plot stretches to its container (preserveAspectRatio none) with non-scaling
// strokes, and the axis labels are HTML, so nothing needs measuring.
function SignalSlide() {
  const [patternId, setPatternId] = useState(copy.initialPattern);
  const pattern = copy.patterns.find((item) => item.id === patternId);
  const path = pattern.points.map(([x, y], index) => `${index ? 'L' : 'M'}${x} ${y}`).join(' ');

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <div className="walkthrough-choices" role="group" aria-label={copy.patternsLabel}>
        {copy.patterns.map((item) => (
          <button
            key={item.id}
            type="button"
            className="walkthrough-choice"
            aria-pressed={item.id === patternId}
            onClick={() => setPatternId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="aooct-panel">
        <div className="aooct-panel-head">
          <strong>{copy.plotTitle}</strong>
          <span className="walkthrough-field-label">{copy.plotBadge}</span>
        </div>
        <span className="aooct-axis-y">{copy.axisY}</span>
        <div role="img" aria-label={pattern.plotLabel}>
          <svg
            className="aooct-plot"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect
              className={`aooct-plot-region ${pattern.id === 'flat' ? '' : 'is-active'}`}
              x={copy.region.x}
              y="10"
              width={copy.region.width}
              height={HEIGHT - 20}
            />
            <path className="aooct-plot-grid" d={`M0 30 H${WIDTH} M0 146 H${WIDTH}`} />
            <path className="aooct-plot-axis" d={`M0 10 V${HEIGHT - 10} H${WIDTH}`} />
            <path className="aooct-plot-baseline" d={`M0 ${BASELINE} H${WIDTH}`} />
            <path className="aooct-plot-line" d={path} />
          </svg>
        </div>
        <span className="aooct-axis-x">
          {copy.axisX} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </span>
      </div>
      <p className="aooct-detail" aria-live="polite">
        {pattern.caption}
      </p>

      <p className="walkthrough-aside aooct-aside">
        <i className="fa-solid fa-lightbulb" aria-hidden="true" />
        {copy.note}
      </p>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} />
    </>
  );
}

export default SignalSlide;
