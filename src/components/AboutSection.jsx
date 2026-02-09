function AboutSection({ about, techStack, education }) {
  return (
    <section className="section" id="about">
      <div className="about-layout">
        <article className="about-card">
          <h2 className="about-card-title">About Me</h2>
          <p>{about}</p>
        </article>

        <div className="about-grid">
          <article className="panel">
            <h3>Tech Stack</h3>
            <div className="chip-list">
              {techStack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>

          <article className="panel">
            <h3>Education</h3>
            <ul className="education-list">
              {education.map((item) => (
                <li key={item.degree}>
                  <div className="education-header">
                    <h4>{item.degree}</h4>
                    <span>{item.duration}</span>
                  </div>
                  <p>{item.school}</p>
                  <p>{item.details}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
