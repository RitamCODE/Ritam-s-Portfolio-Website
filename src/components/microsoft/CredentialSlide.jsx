import { useState } from 'react';
import SkillsFooter from '../walkthrough/SkillsFooter';
import ProjectNotes from '../walkthrough/ProjectNotes';
import Diagram from './Diagram';
import Choices from './Choices';
import { credentialSlide as copy } from '../../data/microsoftWalkthrough';

function Boundary({ icon, title, items, location, runtime }) {
  return (
    <div className={`msft-boundary ${runtime ? 'is-runtime' : ''}`}>
      <p className="msft-boundary-title">
        <i className={`fa-solid ${icon}`} aria-hidden="true" />
        {title}
      </p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="msft-boundary-location">{location}</p>
    </div>
  );
}

function CredentialSlide() {
  const [stageId, setStageId] = useState(copy.initialStage);
  const stage = copy.stages.find((item) => item.id === stageId);

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <Choices label={copy.choicesLabel} stages={copy.stages} value={stageId} onChange={setStageId} />

      <Diagram variant="pair" label={copy.diagramLabel}>
        <Boundary
          icon="fa-box"
          title={copy.saved.title}
          items={copy.saved.items}
          location={stage.modelCredentials}
        />
        <i className="fa-solid fa-arrow-right msft-arrow" aria-hidden="true" />
        <Boundary
          runtime
          icon="fa-gear"
          title={copy.runtime.title}
          items={copy.runtime.items}
          location={stage.runtimeCredentials}
        />
      </Diagram>
      <p className="msft-detail" aria-live="polite">
        {stage.detail}
      </p>

      <SkillsFooter skills={copy.demonstrated} />
      <ProjectNotes {...copy.notes} />
    </>
  );
}

export default CredentialSlide;
