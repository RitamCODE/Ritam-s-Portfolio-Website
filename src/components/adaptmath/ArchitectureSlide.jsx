import { Fragment } from 'react';
import SourceLink from './SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { architectureSlide as copy } from '../../data/adaptmathWalkthrough';

function ArchitectureSlide() {
  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <p className="walkthrough-aside">
        <i className="fa-solid fa-bolt" aria-hidden="true" />
        {copy.laneLabel}
      </p>
      <ol className="walkthrough-chain">
        {copy.chain.map((step, index) => (
          <Fragment key={step.name}>
            {index > 0 && (
              <li className="walkthrough-chain-arrow" aria-hidden="true">
                <i className="fa-solid fa-arrow-right" />
              </li>
            )}
            <li className={`walkthrough-system ${step.engine ? 'is-engine' : ''}`}>
              {step.name}
              <small>{step.detail}</small>
            </li>
          </Fragment>
        ))}
      </ol>
      <p className="walkthrough-verdict">
        <i className="fa-solid fa-check" aria-hidden="true" />
        {copy.verdict}
      </p>

      <div className="walkthrough-cards">
        {copy.cards.map((card) => (
          <div className="walkthrough-card" key={card.title}>
            <h5>
              <i className={`fa-solid ${card.icon}`} aria-hidden="true" />
              {card.title}
            </h5>
            {card.lines.map(([label, text]) => (
              <p key={text}>
                {label && <strong>{label}</strong>} {text}
              </p>
            ))}
          </div>
        ))}
      </div>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} source={copy.source} />
    </>
  );
}

export default ArchitectureSlide;
