import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { purposeSlide as copy } from '../../data/birdWalkthrough';

function PurposeSlide() {
  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <div className="bird-purpose" role="img" aria-label={copy.diagramLabel}>
        <div className="bird-cues">
          {copy.cues.map((cue) => (
            <div className="walkthrough-card bird-cue" key={cue.title}>
              <i className={`fa-solid ${cue.icon}`} aria-hidden="true" />
              <div>
                <strong>{cue.title}</strong>
                <small>{cue.text}</small>
              </div>
            </div>
          ))}
        </div>
        <i className="fa-solid fa-arrow-right bird-purpose-arrow" aria-hidden="true" />
        <div className="bird-response">
          <i className={`fa-solid ${copy.outcome.icon}`} aria-hidden="true" />
          <strong>{copy.outcome.title}</strong>
          <small>{copy.outcome.text}</small>
          <span className="bird-prediction">{copy.outcome.prediction}</span>
        </div>
      </div>

      <p className="walkthrough-aside bird-aside">
        <i className="fa-solid fa-leaf" aria-hidden="true" />
        {copy.motivation}
      </p>
      <p className="walkthrough-note-small">{copy.ownership}</p>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} />
    </>
  );
}

export default PurposeSlide;
