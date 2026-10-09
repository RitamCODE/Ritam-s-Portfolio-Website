import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { limitsSlide as copy } from '../../data/birdWalkthrough';

function LimitsSlide() {
  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <ol className="bird-boundaries">
        {copy.items.map((item) => (
          <li key={item.title}>
            <span className="bird-marker" aria-hidden="true">
              <i className={`fa-solid ${item.icon}`} />
            </span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
              <span className="walkthrough-field-label">{item.label}</span>
            </div>
          </li>
        ))}
      </ol>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} />
    </>
  );
}

export default LimitsSlide;
