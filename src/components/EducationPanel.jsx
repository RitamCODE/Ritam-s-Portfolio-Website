import { useId, useState } from 'react';

// One independently expandable row. The summary button is the whole header: opening it swaps
// the abbreviated labels for their full names in place, and the region below only adds
// what the header can't say (coursework, or the certificate link).
function EducationEntry({ title, subtitle, duration, children }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const buttonId = `${id}-button`;
  const regionId = `${id}-region`;

  return (
    <div className={`education-entry${open ? ' is-open' : ''}`}>
      <button
        type="button"
        id={buttonId}
        className="education-summary"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="education-title">{title(open)}</span>
        <span className="education-school">{subtitle(open)}</span>
        <span className="education-dates">{duration}</span>
        <i className="fa-solid fa-chevron-down education-chevron" aria-hidden="true" />
      </button>
      <div className="education-collapse">
        <div className="education-collapse-inner">
          <div id={regionId} role="region" aria-labelledby={buttonId} className="education-details">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationPanel({ education, courses }) {
  return (
    <div className="education-grid">
      <div className="education-column education-university">
        {education.map((item) => (
          <EducationEntry
            key={item.id}
            duration={item.duration}
            title={(open) => (
              <>
                <strong>{open ? item.levelFull : item.level}</strong>
                {' · '}
                {open ? item.subjectFull : item.subject}
              </>
            )}
            subtitle={(open) => (open ? item.schoolFull : item.school)}
          >
            <p>
              <span className="education-label">Coursework</span>
              {item.coursework.join(', ')}
            </p>
          </EducationEntry>
        ))}
      </div>

      {courses.length > 0 && (
        <div className="education-column education-continuing">
          <h4 className="education-subhead">Continuing education</h4>
          {courses.map((course) => (
            <EducationEntry
              key={course.title}
              duration={course.duration}
              title={() => <strong>{course.title}</strong>}
              subtitle={(open) => (open ? course.providerFull : course.provider)}
            >
              {course.certificate && (
                <a
                  className="inline-link"
                  href={course.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View certificate{' '}
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                </a>
              )}
            </EducationEntry>
          ))}
        </div>
      )}
    </div>
  );
}

export default EducationPanel;
