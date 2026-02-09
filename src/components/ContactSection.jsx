function ContactSection({ profile }) {
  return (
    <footer className="section contact-section" id="contact">
      <div className="contact">
        <h2 className="section-title">Let&apos;s Build Something Useful</h2>
        <p className="contact-copy">
          I am open to software engineering and machine learning opportunities where I can ship practical systems and
          improve product quality at scale.
        </p>

        <a className="mail-link" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>

        <div className="social-links">
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fa-brands fa-github" aria-hidden="true" />
          </a>
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin" aria-hidden="true" />
          </a>
          <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X">
            <i className="fa-brands fa-x-twitter" aria-hidden="true" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <i className="fa-solid fa-envelope" aria-hidden="true" />
          </a>
        </div>

        <a className="back-to-top" href="#home">
          Back to top
        </a>
      </div>

      <p className="footer-credit">&copy; {new Date().getFullYear()} Built by Ritam with Codex</p>
    </footer>
  );
}

export default ContactSection;
