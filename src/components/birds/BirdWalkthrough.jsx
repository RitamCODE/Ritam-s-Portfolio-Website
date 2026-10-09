import WalkthroughDeck from '../walkthrough/WalkthroughDeck';
import PurposeSlide from './PurposeSlide';
import AudioSlide from './AudioSlide';
import EncoderSlide from './EncoderSlide';
import FusionSlide from './FusionSlide';
import LimitsSlide from './LimitsSlide';
import { walkthroughMeta, walkthroughSlides } from '../../data/birdWalkthrough';

const SLIDE_CONTENT = {
  purpose: <PurposeSlide />,
  audio: <AudioSlide />,
  encoder: <EncoderSlide />,
  fusion: <FusionSlide />,
  limits: <LimitsSlide />
};

const slides = walkthroughSlides.map((slide) => ({ ...slide, content: SLIDE_CONTENT[slide.key] }));

function BirdWalkthrough({ id, expanded }) {
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

export default BirdWalkthrough;
