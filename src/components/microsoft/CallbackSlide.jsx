import { useState } from 'react';
import SkillsFooter from '../walkthrough/SkillsFooter';
import ProjectNotes from '../walkthrough/ProjectNotes';
import { callbackSlide as copy } from '../../data/microsoftWalkthrough';

function CallbackSlide() {
  const [stageId, setStageId] = useState(copy.initialStage);
  const stage = copy.stages.find((item) => item.id === stageId);

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <div className="msft-events" role="group" aria-label={copy.choicesLabel}>
        {copy.stages.map((item) => (
          <button
            key={item.id}
            type="button"
            className="msft-event"
            aria-pressed={item.id === stageId}
            onClick={() => setStageId(item.id)}
          >
            <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
            {item.label}
          </button>
        ))}
      </div>
      <div className="msft-console" aria-live="polite">
        <small>{copy.consoleLabel}</small>
        <span>{stage.output}</span>
      </div>
      <p className="msft-caption">{stage.caption}</p>

      <p className="msft-planned">
        <i className="fa-solid fa-cloud" aria-hidden="true" />
        {copy.planned}
      </p>

      <SkillsFooter skills={copy.demonstrated} label={copy.demonstratedLabel} />
      <ProjectNotes {...copy.notes} />
    </>
  );
}

export default CallbackSlide;
