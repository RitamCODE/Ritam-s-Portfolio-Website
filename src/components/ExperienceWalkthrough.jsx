import MicrosoftWalkthrough from './microsoft/MicrosoftWalkthrough';

// An experience entry opts in with `walkthrough: '<key>'` in portfolioData.js, the same way a
// project does. The toggle sits in the experience panel, but the deck renders as its own band
// below the tabs + panel (ExperienceSection places it), so it can span the section's full
// centred width. ExperienceSection owns the open state that links the two.
const WALKTHROUGHS = {
  microsoft: MicrosoftWalkthrough
};

export function ExperienceWalkthroughActions({ experience, controls, expanded, onToggle }) {
  if (!WALKTHROUGHS[experience.walkthrough]) return null;

  return (
    <div className="experience-actions">
      {experience.links?.map((link) => (
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
      <button
        type="button"
        className="walkthrough-toggle"
        aria-expanded={expanded}
        aria-controls={controls}
        onClick={onToggle}
      >
        <i className="fa-solid fa-diagram-project" aria-hidden="true" />
        Explore my contribution
        <i className="fa-solid fa-chevron-down walkthrough-chevron" aria-hidden="true" />
      </button>
    </div>
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
