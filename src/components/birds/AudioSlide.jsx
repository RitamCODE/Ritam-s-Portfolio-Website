import { useMemo, useState } from 'react';
import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { audioSlide as copy } from '../../data/birdWalkthrough';

const WIDTH = 600;
const HEIGHT = 155;
const MID = HEIGHT / 2;

// Illustrative signals only: smooth deterministic shapes, not a recording or model output.
function waveformPath() {
  let d = '';
  for (let x = 0; x <= WIDTH; x += 2) {
    const t = x / WIDTH;
    const envelope =
      0.12 + 0.8 * Math.exp(-(((t - 0.27) / 0.085) ** 2)) + 0.65 * Math.exp(-(((t - 0.64) / 0.14) ** 2));
    const y = MID + Math.sin(t * 181) * Math.sin(t * 37) * 55 * envelope;
    d += `${x === 0 ? 'M' : 'L'}${x},${y.toFixed(1)} `;
  }
  return d;
}

function spectrogramCells(cols, rows) {
  const cells = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const t = c / cols;
      const f = r / rows;
      const a =
        Math.exp(-(((f - (0.55 - 0.23 * Math.sin(t * 11))) / 0.075) ** 2)) *
        Math.exp(-(((t - 0.3) / 0.16) ** 2));
      const b =
        Math.exp(-(((f - (0.34 + 0.16 * Math.sin(t * 14))) / 0.08) ** 2)) *
        Math.exp(-(((t - 0.72) / 0.17) ** 2));
      cells.push({ c, r, opacity: 0.03 + 0.91 * Math.min(1, a + b) });
    }
  }
  return cells;
}

function Schematic({ stage }) {
  const waveform = useMemo(waveformPath, []);
  // The model-input stage draws a coarser, square-ish grid to suggest the fixed 128 x 128 shape.
  const mel = useMemo(() => spectrogramCells(38, 18), []);
  const input = useMemo(() => spectrogramCells(32, 18), []);

  const grid = stage === 'input' ? input : mel;
  const cols = stage === 'input' ? 32 : 38;
  const cw = WIDTH / cols;
  const ch = HEIGHT / 18;

  return (
    <svg
      className="bird-plot"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {stage === 'waveform' ? (
        <>
          <line x1="0" x2={WIDTH} y1={MID} y2={MID} className="bird-plot-axis" />
          <path d={waveform} className="bird-plot-line" />
        </>
      ) : (
        grid.map(({ c, r, opacity }) => (
          <rect
            key={`${r}-${c}`}
            x={(c * cw).toFixed(2)}
            y={(r * ch).toFixed(2)}
            width={Math.max(0.5, cw - 0.5).toFixed(2)}
            height={Math.max(0.5, ch - 0.5).toFixed(2)}
            rx="1"
            className="bird-plot-cell"
            opacity={opacity.toFixed(2)}
          />
        ))
      )}
    </svg>
  );
}

function AudioSlide() {
  const [stageId, setStageId] = useState(copy.initialStage);
  const stage = copy.stages.find((item) => item.id === stageId);

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <div className="walkthrough-choices" role="group" aria-label={copy.stagesLabel}>
        {copy.stages.map((item) => (
          <button
            key={item.id}
            type="button"
            className="walkthrough-choice"
            aria-pressed={item.id === stageId}
            onClick={() => setStageId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="bird-signal">
        <div className="bird-signal-head">
          <strong>{stage.heading}</strong>
          <span className="walkthrough-field-label">{stage.size}</span>
        </div>
        <div role="img" aria-label={stage.plotLabel}>
          <Schematic stage={stage.id} />
        </div>
        <div className="bird-axis">
          <span>{stage.axisLeft}</span>
          <span>{stage.axisRight}</span>
        </div>
      </div>
      <p className="bird-detail" aria-live="polite">
        {stage.detail}
      </p>
      <p className="walkthrough-note-small">{copy.schematicNote}</p>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} />
    </>
  );
}

export default AudioSlide;
