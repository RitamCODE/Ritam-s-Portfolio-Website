import { Fragment } from 'react';

// A paragraph is a string, or a list of parts where { text, href } is an inline link.
function AboutParagraph({ content }) {
  const parts = Array.isArray(content) ? content : [content];

  return (
    <p>
      {parts.map((part, index) =>
        typeof part === 'string' ? (
          <Fragment key={index}>{part}</Fragment>
        ) : (
          <a key={index} href={part.href} target="_blank" rel="noopener noreferrer">
            {part.text}
          </a>
        )
      )}
    </p>
  );
}

function AboutSection({ about, techStack, education, courses, patents }) {
  return (
    <section className="section" id="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-layout">
        <article className="about-card">
          {about.map((paragraph, index) => (
            <AboutParagraph key={index} content={paragraph} />
          ))}
        </article>

        <article className="panel">
          <h3>Tech Stack</h3>
          <div className="tech-groups">
            {techStack.map((group) => (
              <div className="tech-group" key={group.label}>
                <h4 className="tech-group-label">{group.label}</h4>
                <div className="chip-list">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel about-education">
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

          {courses.length > 0 && (
            <>
              <h4 className="education-subhead">Continuing Education</h4>
              <ul className="education-list education-extra">
                {courses.map((course) => (
                  <li key={course.title}>
                    <div className="education-header">
                      <h4>{course.title}</h4>
                      <span>{course.duration}</span>
                    </div>
                    <p>{course.provider}</p>
                    {course.certificate && (
                      <a
                        className="inline-link"
                        href={course.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Certificate{' '}
                        <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>

        <article className="panel about-patents" id="patents">
          <h3>Design Patents</h3>
          <ul className="patent-list">
            {patents.map((patent) => (
              <li key={`${patent.title}-${patent.certificate}`}>
                <p>{patent.title}</p>
                <a
                  className="inline-link"
                  href={patent.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Certificate{' '}
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default AboutSection;
