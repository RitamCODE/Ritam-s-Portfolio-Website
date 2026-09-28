import { scrollToHash } from '../utils/scrollToHash';

function Hero({ profile }) {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>{profile.name}</h1>
        <h2>{profile.role}</h2>
        <p>{profile.summary}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary" onClick={(event) => scrollToHash(event, '#projects')}>
            View Projects
          </a>
          <a href={profile.resume} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
            Download Resume
          </a>
        </div>
      </div>
      <div className="hero-art">
        <img src={profile.image} alt="Portrait of Ritam Mukherjee" />
      </div>
    </section>
  );
}

export default Hero;
