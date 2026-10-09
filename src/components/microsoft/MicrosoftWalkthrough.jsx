import WalkthroughDeck from '../walkthrough/WalkthroughDeck';
import PurposeSlide from './PurposeSlide';
import RetrievalSlide from './RetrievalSlide';
import SaveLoadSlide from './SaveLoadSlide';
import CredentialSlide from './CredentialSlide';
import CallbackSlide from './CallbackSlide';
import OutcomesSlide from './OutcomesSlide';
import { walkthroughMeta, walkthroughSlides } from '../../data/microsoftWalkthrough';

const SLIDE_CONTENT = {
  purpose: <PurposeSlide />,
  retrieval: <RetrievalSlide />,
  saveload: <SaveLoadSlide />,
  credentials: <CredentialSlide />,
  callback: <CallbackSlide />,
  outcomes: <OutcomesSlide />
};

const slides = walkthroughSlides.map((slide) => ({ ...slide, content: SLIDE_CONTENT[slide.key] }));

function MicrosoftWalkthrough({ id, expanded }) {
  return (
    <WalkthroughDeck
      id={id}
      expanded={expanded}
      adaptiveHeight
      slides={slides}
      label={walkthroughMeta.label}
      heading={walkthroughMeta.heading}
      hint={false}
    />
  );
}

export default MicrosoftWalkthrough;
