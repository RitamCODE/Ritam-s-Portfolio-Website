import ProjectNotes from '../walkthrough/ProjectNotes';
import Diagram from './Diagram';
import FlowNodes from './FlowNodes';
import { purposeSlide as copy } from '../../data/microsoftWalkthrough';

function PurposeSlide() {
  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <Diagram variant="flow" label={copy.diagramLabel}>
        <FlowNodes nodes={copy.nodes} />
      </Diagram>

      <p className="walkthrough-aside msft-aside">
        <i className="fa-solid fa-users" aria-hidden="true" />
        {copy.benefit}
      </p>

      <ProjectNotes {...copy.notes} />
    </>
  );
}

export default PurposeSlide;
