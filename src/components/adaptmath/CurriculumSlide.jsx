import { Fragment, useState } from 'react';
import SourceLink from './SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { curriculumSlide as copy } from '../../data/adaptmathWalkthrough';

function CurriculumSlide() {
  const [selected, setSelected] = useState(copy.initialSkill);
  const skill = copy.skills[selected];

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>
      <p className="walkthrough-badge">
        <i className="fa-solid fa-sitemap" aria-hidden="true" />
        {copy.badge}
      </p>

      <div className="walkthrough-skills" role="group" aria-label={copy.chainLabel}>
        {copy.skills.map((item, index) => (
          <Fragment key={item.name}>
            {index > 0 && <i className="fa-solid fa-arrow-right walkthrough-skill-arrow" aria-hidden="true" />}
            <button
              type="button"
              className="walkthrough-skill"
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
            >
              <span className="walkthrough-skill-symbol" aria-hidden="true">
                {item.symbol}
              </span>
              <span>{item.name}</span>
            </button>
          </Fragment>
        ))}
      </div>

      <div className="walkthrough-detail" aria-live="polite">
        <h5>{skill.name}</h5>
        <p>{skill.prereq}</p>
        <div className="walkthrough-widths">
          <span>Digit width</span>
          {skill.widths.map((digits, index) => (
            <Fragment key={digits}>
              {index > 0 && <span aria-hidden="true">→</span>}
              <span className="walkthrough-width">
                {digits} {digits === 1 ? 'digit' : 'digits'}
              </span>
            </Fragment>
          ))}
        </div>
        <p>{skill.rule}</p>
      </div>

      <p className="walkthrough-note-small">{copy.separation}</p>
      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} source={copy.source} />
    </>
  );
}

export default CurriculumSlide;
