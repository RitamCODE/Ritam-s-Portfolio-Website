import ProjectCard from './ProjectCard';

function ResearchSection({ research }) {
  return (
    <section className="section" id="research">
      <h2 className="section-title">Research</h2>

      <div className="project-featured-grid">
        {research.map((item) => (
          <ProjectCard key={item.title} project={item} tag="Ongoing Research" />
        ))}
      </div>
    </section>
  );
}

export default ResearchSection;
