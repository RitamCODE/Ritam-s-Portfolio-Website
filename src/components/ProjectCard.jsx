function ProjectCard({ project, tag }) {
  return (
    <article className={`project-card ${tag ? 'featured' : ''}`}>
      {tag && <p className="project-tag">{tag}</p>}
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
    </article>
  );
}

export default ProjectCard;
