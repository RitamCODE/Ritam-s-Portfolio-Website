import WalkthroughDeck from '../walkthrough/WalkthroughDeck';
import PurposeSlide from './PurposeSlide';
import SignalSlide from './SignalSlide';
import PipelineSlide from './PipelineSlide';
import FindingsSlide from './FindingsSlide';
import LimitsSlide from './LimitsSlide';
import { walkthroughMeta, walkthroughSlides } from '../../data/aoOctWalkthrough';

const SLIDE_CONTENT = {
  purpose: <PurposeSlide />,
  signal: <SignalSlide />,
  pipeline: <PipelineSlide />,
  findings: <FindingsSlide />,
  limits: <LimitsSlide />
};

const slides = walkthroughSlides.map((slide) => ({ ...slide, content: SLIDE_CONTENT[slide.key] }));

function AoOctWalkthrough({ id, expanded }) {
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

export default AoOctWalkthrough;
