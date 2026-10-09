import { useState } from 'react';
import SkillsFooter from '../walkthrough/SkillsFooter';
import ProjectNotes from '../walkthrough/ProjectNotes';
import Diagram from './Diagram';
import Choices from './Choices';
import { saveLoadSlide as copy } from '../../data/microsoftWalkthrough';

function SaveLoadSlide() {
  const [stageId, setStageId] = useState(copy.initialStage);
  const stage = copy.stages.find((item) => item.id === stageId);

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <Choices label={copy.choicesLabel} stages={copy.stages} value={stageId} onChange={setStageId} />

      <Diagram variant="pair" label={copy.diagramLabel}>
        <div className="msft-bundle">
          <p className="msft-mini-label">{copy.bundleLabel}</p>
          <div className="msft-file">
            <i className="fa-solid fa-file-code" aria-hidden="true" />
            <div>
              <strong>{copy.chainFile.name}</strong>
              <small>{copy.chainFile.detail}</small>
            </div>
          </div>
          <div className={`msft-file ${stage.missing ? 'is-missing' : ''}`}>
            <i className="fa-solid fa-box-archive" aria-hidden="true" />
            <div>
              <strong>{stage.retrieverName}</strong>
              <small>{stage.retrieverDetail}</small>
            </div>
          </div>
        </div>
        <i className="fa-solid fa-arrow-right msft-arrow" aria-hidden="true" />
        <div className="msft-rebuild">
          <i className="fa-solid fa-box-open" aria-hidden="true" />
          <strong>{stage.rebuildTitle}</strong>
          <small>{stage.rebuildDetail}</small>
        </div>
      </Diagram>

      <p className="msft-mini-label">{stage.outputLabel}</p>
      <div aria-live="polite">
        {stage.isCode ? (
          <pre className="msft-code">{stage.output}</pre>
        ) : (
          <p className="msft-gap-note">{stage.output}</p>
        )}
      </div>
      <p className="msft-status">
        <i className="fa-solid fa-code-pull-request" aria-hidden="true" />
        {copy.status}
      </p>

      <SkillsFooter skills={copy.demonstrated} />
      <ProjectNotes {...copy.notes} />
    </>
  );
}

export default SaveLoadSlide;
