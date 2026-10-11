import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { limitsSlide as copy } from '../../data/aoOctWalkthrough';

function LimitsSlide() {
  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <ul className="aooct-lessons">
        {copy.lessons.map((lesson) => (
          <li key={lesson.title}>
            <i className={`fa-solid ${lesson.icon}`} aria-hidden="true" />
            <div>
              <strong>{lesson.title}</strong>
              <p>{lesson.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="aooct-outlook">
        <div className="walkthrough-next">
          <span className="walkthrough-field-label">{copy.limits.label}</span>
          <ul className="aooct-limit-list">
            {copy.limits.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="walkthrough-next">
          <span className="walkthrough-field-label">{copy.next.label}</span>
          <p>{copy.next.text}</p>
        </div>
      </div>

      <p className="walkthrough-aside aooct-aside">
        <i className="fa-solid fa-flask" aria-hidden="true" />
        {copy.exploratory}
      </p>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} />
    </>
  );
}

export default LimitsSlide;
