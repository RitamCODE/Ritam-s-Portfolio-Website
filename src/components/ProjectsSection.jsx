function ProjectsSection({ projects }) {
  const featured = projects.filter((item) => item.featured);
  const otherProjects = projects.filter((item) => !item.featured);

  return (
    <section className="section" id="projects">
      <p className="section-kicker">03. Projects</p>
      <h2 className="section-title">Fun Projects and Research</h2>

      <div className="project-featured-grid">
        {featured.map((project) => (
          <article className="project-card featured" key={project.title}>
            <p className="project-tag">Featured Project</p>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="chip-list">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              View Code <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>

      <div className="project-grid">
        {otherProjects.map((project) => (
          <article className="project-card" key={project.title}>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="chip-list">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              Repo <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
