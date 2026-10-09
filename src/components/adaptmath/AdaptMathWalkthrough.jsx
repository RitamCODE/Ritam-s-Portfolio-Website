import WalkthroughDeck from '../walkthrough/WalkthroughDeck';
import PurposeSlide from './PurposeSlide';
import ArchitectureSlide from './ArchitectureSlide';
import TurnGraphSlide from './TurnGraphSlide';
import BktSlide from './BktSlide';
import CurriculumSlide from './CurriculumSlide';
import DiagnosisSlide from './DiagnosisSlide';
import EvaluationSlide from './EvaluationSlide';
import { walkthroughMeta, walkthroughSlides } from '../../data/adaptmathWalkthrough';

const SLIDE_CONTENT = {
  purpose: <PurposeSlide />,
  architecture: <ArchitectureSlide />,
  turns: <TurnGraphSlide />,
  bkt: <BktSlide />,
  curriculum: <CurriculumSlide />,
  diagnosis: <DiagnosisSlide />,
  evaluation: <EvaluationSlide />
};

const slides = walkthroughSlides.map((slide) => ({ ...slide, content: SLIDE_CONTENT[slide.key] }));

function AdaptMathWalkthrough({ id, expanded }) {
  return (
    <WalkthroughDeck
      id={id}
      expanded={expanded}
      slides={slides}
      label={walkthroughMeta.label}
      heading={walkthroughMeta.heading}
      note={walkthroughMeta.note}
    />
  );
}

export default AdaptMathWalkthrough;
