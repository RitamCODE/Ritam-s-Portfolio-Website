import { useState } from 'react';
import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { pipelineSlide as copy } from '../../data/aoOctWalkthrough';

const STRIPS = 9;
const HIGHLIGHT_STRIP = 3;

// One conceptual diagram per step. None of them is drawn from a scan.
function StepDiagram({ id }) {
  switch (id) {
    case 'export':
      return (
        <div className="aooct-tokens">
          <span>4 classes</span>
          <span>× height</span>
          <span>× width</span>
        </div>
      );
    case 'softmax':
      return (
        <div className="aooct-tokens">
          <span>p₀</span>
          <span>p₁</span>
          <span>p₂</span>
          <span>p₃</span>
          <span className="is-result">Sum = 1</span>
        </div>
      );
    case 'strips':
      return (
        <div className="aooct-strips">
          <div className="aooct-strip-grid">
            {Array.from({ length: STRIPS }, (_, index) => (
              <b key={index} className={index === HIGHLIGHT_STRIP ? 'is-active' : undefined} />
            ))}
          </div>
          <small>One strip spans the full image height</small>
        </div>
      );
    case 'smooth':
      return (
        <div className="aooct-tokens">
          <span>Previous</span>
          <span>Current</span>
          <span>Next</span>
          <i className="fa-solid fa-arrow-right" />
          <span className="is-result">3-point mean</span>
        </div>
      );
    default:
      return (
        <div className="aooct-align">
          <span>Retinal image, cropped for display</span>
          <span>Foreground class curves</span>
          <b />
        </div>
      );
  }
}

function PipelineSlide() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = copy.steps[stepIndex];

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <div className="walkthrough-choices aooct-steps" role="group" aria-label={copy.stepsLabel}>
        {copy.steps.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className="walkthrough-choice"
            aria-pressed={index === stepIndex}
            onClick={() => setStepIndex(index)}
          >
            <span className="aooct-step-number">{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="aooct-panel aooct-step-detail">
        <div className="aooct-step-diagram" aria-hidden="true">
          <StepDiagram id={step.id} />
        </div>
        <div aria-live="polite">
          <span className="walkthrough-field-label">{step.kicker}</span>
          <h5>{step.title}</h5>
          <p>{step.text}</p>
        </div>
      </div>

      <p className="walkthrough-aside aooct-aside">
        <i className="fa-solid fa-crop-simple" aria-hidden="true" />
        {copy.note}
      </p>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} />
    </>
  );
}

export default PipelineSlide;
