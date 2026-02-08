function ExperienceSection({ experiences, activeId, onSelect }) {
  const activeExperience = experiences.find((item) => item.id === activeId) || experiences[0];

  return (
    <section className="section" id="experience">
      <p className="section-kicker">02. Experience</p>
      <h2 className="section-title">Where I Have Worked</h2>

      <div className="experience-layout">
        <div className="experience-tabs" role="tablist" aria-label="Experience Companies">
          {experiences.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === activeExperience.id ? 'active' : ''}
              onClick={() => onSelect(item.id)}
            >
              {item.company}
            </button>
          ))}
        </div>

        <article className="experience-panel">
          <div className="experience-head">
            <h3>
              {activeExperience.role} <span>@ {activeExperience.company}</span>
            </h3>
            <p>{activeExperience.duration}</p>
          </div>
          <p className="experience-location">{activeExperience.location}</p>
          <ul>
            {activeExperience.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default ExperienceSection;
