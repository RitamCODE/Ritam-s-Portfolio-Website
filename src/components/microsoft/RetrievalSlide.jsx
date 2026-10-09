import { useState } from 'react';
import SkillsFooter from '../walkthrough/SkillsFooter';
import ProjectNotes from '../walkthrough/ProjectNotes';
import Diagram from './Diagram';
import FlowNodes from './FlowNodes';
import Choices from './Choices';
import { retrievalSlide as copy } from '../../data/microsoftWalkthrough';

function RetrievalSlide() {
  const [stageId, setStageId] = useState(copy.initialStage);
  const stage = copy.stages.find((item) => item.id === stageId);

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <Choices label={copy.choicesLabel} stages={copy.stages} value={stageId} onChange={setStageId} />

      <Diagram variant="flow" label={copy.diagramLabel}>
        <FlowNodes nodes={copy.nodes} active={stage.active} />
      </Diagram>
      <p className="msft-detail" aria-live="polite">
        {stage.detail}
      </p>

      <p className="msft-backend">
        <span>{copy.backend.label}</span>
        <strong>{copy.backend.from}</strong>
        <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        <strong>{copy.backend.to}</strong>
      </p>

      <SkillsFooter skills={copy.demonstrated} />
      <ProjectNotes {...copy.notes} />
    </>
  );
}

export default RetrievalSlide;
