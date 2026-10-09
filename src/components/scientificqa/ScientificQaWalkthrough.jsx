import WalkthroughDeck from '../walkthrough/WalkthroughDeck';
import PurposeSlide from './PurposeSlide';
import DataPrepSlide from './DataPrepSlide';
import LoraSlide from './LoraSlide';
import BlindEvalSlide from './BlindEvalSlide';
import FindingsSlide from './FindingsSlide';
import { walkthroughMeta, walkthroughSlides } from '../../data/scientificQaWalkthrough';

const SLIDE_CONTENT = {
  purpose: <PurposeSlide />,
  data: <DataPrepSlide />,
  lora: <LoraSlide />,
  evaluation: <BlindEvalSlide />,
  findings: <FindingsSlide />
};

const slides = walkthroughSlides.map((slide) => ({ ...slide, content: SLIDE_CONTENT[slide.key] }));

function ScientificQaWalkthrough({ id, expanded }) {
  return (
    <WalkthroughDeck
      id={id}
      expanded={expanded}
      adaptiveHeight
      slides={slides}
      label={walkthroughMeta.label}
      heading={walkthroughMeta.heading}
      note={walkthroughMeta.note}
    />
  );
}

export default ScientificQaWalkthrough;
