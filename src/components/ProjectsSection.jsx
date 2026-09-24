import ProjectCard from './ProjectCard';

function ProjectsSection({ projects }) {
  const featured = projects.filter((item) => item.featured);
  const otherProjects = projects.filter((item) => !item.featured);

  return (
    <section className="section" id="projects">
      <h2 className="section-title">Projects</h2>

      <div className="project-featured-grid">
        {featured.map((project) => (
          <ProjectCard key={project.title} project={project} tag="Featured Project" />
        ))}
      </div>

      {otherProjects.length > 0 && (
        <div className="project-grid">
          {otherProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;
