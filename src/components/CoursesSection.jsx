function CoursesSection({ courses }) {
  return (
    <section className="section" id="courses">
      <h2 className="section-title">Courses</h2>

      <div className="course-grid">
        {courses.map((course) => (
          <article className="course-card" key={course.title}>
            <div className="course-head">
              <h3>{course.title}</h3>
              <p>{course.duration}</p>
            </div>
            <p className="course-provider">{course.provider}</p>
            <p className="course-text">{course.overview}</p>
            <p className="course-text">
              <strong>Topics:</strong> {course.topics}
            </p>
            {course.certificate && (
              <a className="course-link" href={course.certificate} target="_blank" rel="noopener noreferrer">
                View Certificate <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default CoursesSection;
