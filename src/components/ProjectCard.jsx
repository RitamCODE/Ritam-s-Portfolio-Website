import { useId, useState } from 'react';
import AdaptMathWalkthrough from './adaptmath/AdaptMathWalkthrough';
import ScientificQaWalkthrough from './scientificqa/ScientificQaWalkthrough';
import BirdWalkthrough from './birds/BirdWalkthrough';

// A project opts in with `walkthrough: '<key>'` in portfolioData.js.
const WALKTHROUGHS = {
  adaptmath: AdaptMathWalkthrough,
  scientificqa: ScientificQaWalkthrough,
  birds: BirdWalkthrough
};

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const walkthroughId = useId();
  const Walkthrough = project.walkthrough ? WALKTHROUGHS[project.walkthrough] : null;

  return (
    <article
      className={`project-card ${project.featured ? 'featured' : ''} ${expanded ? 'is-expanded' : ''}`}
    >
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="chip-list">
        {project.stack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div className="project-links">
        {project.links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label} <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
          </a>
        ))}
        {Walkthrough && (
          <button
            type="button"
            className="walkthrough-toggle"
            aria-expanded={expanded}
            aria-controls={walkthroughId}
            onClick={() => setExpanded((open) => !open)}
          >
            <i className="fa-solid fa-diagram-project" aria-hidden="true" />
            Inside the engineering
            <i className="fa-solid fa-chevron-down walkthrough-chevron" aria-hidden="true" />
          </button>
        )}
      </div>
      {Walkthrough && <Walkthrough id={walkthroughId} expanded={expanded} />}
    </article>
  );
}

export default ProjectCard;
