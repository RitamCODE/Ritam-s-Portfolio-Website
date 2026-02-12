function PatentsSection({ patents }) {
  return (
    <section className="section" id="patents">
      <h2 className="section-title">Design Patents</h2>

      <div className="patent-grid">
        {patents.map((patent) => (
          <article className="patent-card" key={`${patent.title}-${patent.certificate}`}>
            <h3>{patent.title}</h3>
            <a href={patent.certificate} target="_blank" rel="noopener noreferrer">
              View Certificate <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PatentsSection;
