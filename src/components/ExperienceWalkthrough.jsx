import { useId, useState } from 'react';
import MicrosoftWalkthrough from './microsoft/MicrosoftWalkthrough';

// An experience entry opts in with `walkthrough: '<key>'` in portfolioData.js, the same way a
// project does. The deck stays mounted while collapsed, so reopening lands where it was left.
const WALKTHROUGHS = {
  microsoft: MicrosoftWalkthrough
};

function ExperienceWalkthrough({ experience }) {
  const [expanded, setExpanded] = useState(false);
  const walkthroughId = useId();
  const Walkthrough = WALKTHROUGHS[experience.walkthrough];

  if (!Walkthrough) return null;

  return (
    <>
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
          aria-controls={walkthroughId}
          onClick={() => setExpanded((open) => !open)}
        >
          <i className="fa-solid fa-diagram-project" aria-hidden="true" />
          Explore my contribution
          <i className="fa-solid fa-chevron-down walkthrough-chevron" aria-hidden="true" />
        </button>
      </div>
      <Walkthrough id={walkthroughId} expanded={expanded} />
    </>
  );
}

export default ExperienceWalkthrough;
