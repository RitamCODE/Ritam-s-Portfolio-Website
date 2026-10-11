import MicrosoftWalkthrough from './microsoft/MicrosoftWalkthrough';
import WalkthroughFooter from './walkthrough/WalkthroughFooter';
import { walkthroughSlides as microsoftSlides } from '../data/microsoftWalkthrough';

// An experience entry opts in with `walkthrough: '<key>'` in portfolioData.js, the same way a
// project does. The toggle sits in the experience panel, but the deck renders as its own band
// below the tabs + panel (ExperienceSection places it), so it can span the section's full
// centred width. ExperienceSection owns the open state that links the two.
const WALKTHROUGHS = {
  microsoft: MicrosoftWalkthrough
};
const SLIDE_COUNTS = {
  microsoft: microsoftSlides.length
};

export function ExperienceWalkthroughActions({ experience, controls, expanded, onToggle }) {
  if (!WALKTHROUGHS[experience.walkthrough]) return null;

  return (
    <>
      {experience.links?.length > 0 && (
        <div className="experience-actions">
          {experience.links.map((link) => (
            <a
              key={link.href}
              className="experience-link"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label} <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
      <WalkthroughFooter
        label="Explore my contribution"
        count={SLIDE_COUNTS[experience.walkthrough]}
        expanded={expanded}
        controls={controls}
        onToggle={onToggle}
      />
    </>
  );
}

function ExperienceWalkthrough({ experience, id, expanded }) {
  const Walkthrough = WALKTHROUGHS[experience.walkthrough];

  if (!Walkthrough) return null;

  return (
    <div className="experience-walkthrough">
      <Walkthrough id={id} expanded={expanded} />
    </div>
  );
}

export default ExperienceWalkthrough;
