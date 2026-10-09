import { useState } from 'react';
import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { dataSlide as copy } from '../../data/scientificQaWalkthrough';

function SelectStage() {
  const { select } = copy;
  return (
    <>
      <h5>{select.title}</h5>
      <div className="walkthrough-fields">
        <div>
          <span className="walkthrough-field-label">{select.structureLabel}</span>
          <pre className="walkthrough-code">{select.structure}</pre>
        </div>
        <ul className="walkthrough-rules">
          {select.rules.map((rule) => (
            <li key={rule.text}>
              <i className={`fa-solid ${rule.icon}`} aria-hidden="true" />
              {rule.text}
            </li>
          ))}
        </ul>
      </div>
      <p className="walkthrough-note-small">{select.caveat}</p>
    </>
  );
}

function BuildStage() {
  const { build } = copy;
  return (
    <>
      <h5>{build.title}</h5>
      <div className="walkthrough-fields">
        <div>
          <span className="walkthrough-field-label">{build.inputLabel}</span>
          <p>{build.inputText}</p>
          <p>
            <strong>Question:</strong> {build.question}
          </p>
        </div>
        <div>
          <span className="walkthrough-field-label">{build.outputLabel}</span>
          <p>{build.outputText}</p>
          <p className="walkthrough-note-small">{build.explanation}</p>
        </div>
      </div>
      <p className="walkthrough-note-small">{build.caption}</p>
    </>
  );
}

function SaveStage() {
  const { save } = copy;
  return (
    <>
      <h5>{save.title}</h5>
      <pre className="walkthrough-code">{save.json}</pre>
      <p className="walkthrough-note-small">{save.caption}</p>
    </>
  );
}

const STAGES = { select: SelectStage, build: BuildStage, save: SaveStage };

function DataPrepSlide() {
  const [stage, setStage] = useState(copy.initialStage);
  const Stage = STAGES[stage];

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
            aria-pressed={item.id === stage}
            onClick={() => setStage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="walkthrough-stage" aria-live="polite">
        <Stage />
      </div>

      <p className="walkthrough-counts">
        {copy.counts.map((count) => (
          <span key={count.label}>
            <strong>{count.value}</strong> {count.label}
          </span>
        ))}
        <span>{copy.countsNote}</span>
      </p>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} source={copy.source} />
    </>
  );
}

export default DataPrepSlide;
