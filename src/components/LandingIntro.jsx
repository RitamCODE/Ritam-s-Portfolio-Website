function LandingIntro({ state, profile }) {
  if (state === 'hidden') {
    return null;
  }

  return (
    <div className={`landing-intro ${state === 'exit' ? 'is-exiting' : ''}`} aria-hidden="true">
      <div className="landing-noise" />
      <div className="landing-radial landing-radial-left" />
      <div className="landing-radial landing-radial-right" />

      <div className="landing-content">
        <h1>
          <span>{profile.name.split(' ')[0]}</span>
          <span>{profile.name.split(' ').slice(1).join(' ')}</span>
        </h1>
        <div className="landing-progress" role="presentation">
          <span />
        </div>
      </div>
    </div>
  );
}

export default LandingIntro;
