import { Fragment, useState } from 'react';
import EducationPanel from './EducationPanel';

const TECH_PREVIEW_COUNT = 8;

function AboutPart({ part }) {
  if (typeof part === 'string') return part;

  if (part.emoji) {
    // The leading no-break space ties the emoji to the word before it, so it can never wrap
    // onto a line of its own. It sits inside the hidden span so assistive tech skips both.
    return (
      <span className="about-emoji" aria-hidden="true">
        {' '}
        {part.emoji}
      </span>
    );
  }

  if (part.strong) {
    return <strong className={part.accent ? 'about-strong about-accent' : 'about-strong'}>{part.text}</strong>;
  }

  return (
    <a href={part.href} target="_blank" rel="noopener noreferrer">
      {part.text}
    </a>
  );
}

// A paragraph is a string, or a list of parts: plain strings, { text, href } links,
// { text, strong, accent } emphasis, and { emoji } decorations.
function AboutParagraph({ content }) {
  const parts = Array.isArray(content) ? content : [content];

  return (
    <p>
      {parts.map((part, index) => (
        <Fragment key={index}>
          <AboutPart part={part} />
        </Fragment>
      ))}
    </p>
  );
}

function AboutSection({ about, photo, techStack, education, courses, patents }) {
  const [techExpanded, setTechExpanded] = useState(false);

  const allSkills = techStack.flatMap((group) => group.items);
  const previewSkills = allSkills.slice(0, TECH_PREVIEW_COUNT);
  const remainingCount = allSkills.length - previewSkills.length;

  return (
    <section className="section" id="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-layout">
        <article className="about-card">
          <div className="about-text">
            {about.map((paragraph, index) => (
              <AboutParagraph key={index} content={paragraph} />
            ))}
          </div>
          <figure className="about-photo">
            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
          </figure>
        </article>

        <article className="panel about-tech">
          <h3>Tech Stack</h3>

          {!techExpanded && (
            <div className="chip-list">
              {previewSkills.map((item) => (
                <span key={item}>{item}</span>
              ))}
              {remainingCount > 0 && <span className="chip-more">+{remainingCount} more</span>}
            </div>
          )}

          <button
            type="button"
            className="tech-toggle"
            aria-expanded={techExpanded}
            aria-controls="tech-stack-full"
            onClick={() => setTechExpanded((prev) => !prev)}
          >
            {techExpanded ? 'Hide full tech stack' : 'View full tech stack'}{' '}
            <i className="fa-solid fa-chevron-down" aria-hidden="true" />
          </button>

          {techExpanded && (
            <div className="tech-groups" id="tech-stack-full">
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
          )}
        </article>

        <article className="panel about-education">
          <h3>Education</h3>
          <EducationPanel education={education} courses={courses} />
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
