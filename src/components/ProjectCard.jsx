import { useId, useState } from 'react';
import AdaptMathWalkthrough from './adaptmath/AdaptMathWalkthrough';
import ScientificQaWalkthrough from './scientificqa/ScientificQaWalkthrough';
import BirdWalkthrough from './birds/BirdWalkthrough';
import WalkthroughFooter from './walkthrough/WalkthroughFooter';
import { walkthroughSlides as adaptmathSlides } from '../data/adaptmathWalkthrough';
import { walkthroughSlides as scientificQaSlides } from '../data/scientificQaWalkthrough';
import { walkthroughSlides as birdSlides } from '../data/birdWalkthrough';

// A project opts in with `walkthrough: '<key>'` in portfolioData.js.
const WALKTHROUGHS = {
  adaptmath: { Component: AdaptMathWalkthrough, slides: adaptmathSlides },
  scientificqa: { Component: ScientificQaWalkthrough, slides: scientificQaSlides },
  birds: { Component: BirdWalkthrough, slides: birdSlides }
};

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const walkthroughId = useId();
  const walkthrough = project.walkthrough ? WALKTHROUGHS[project.walkthrough] : null;

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
      </div>
      {walkthrough && (
        <div className="walkthrough-dock">
          <WalkthroughFooter
            label="Inside the engineering"
            count={walkthrough.slides.length}
            expanded={expanded}
            controls={walkthroughId}
            onToggle={() => setExpanded((open) => !open)}
          />
          <walkthrough.Component id={walkthroughId} expanded={expanded} />
        </div>
      )}
    </article>
  );
}

export default ProjectCard;
