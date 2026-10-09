import SkillsFooter from '../walkthrough/SkillsFooter';
import ProjectNotes from '../walkthrough/ProjectNotes';
import { outcomesSlide as copy } from '../../data/microsoftWalkthrough';

function OutcomesSlide() {
  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <ul className="msft-results">
        {copy.results.map((result) => (
          <li key={result.title}>
            <i className={`fa-solid ${result.icon}`} aria-hidden="true" />
            <div>
              <strong>{result.title}</strong>
              <p>{result.text}</p>
              <span className="walkthrough-field-label">{result.label}</span>
            </div>
          </li>
        ))}
      </ul>

      <SkillsFooter skills={copy.demonstrated} />
      <ProjectNotes {...copy.notes} />
    </>
  );
}

export default OutcomesSlide;
