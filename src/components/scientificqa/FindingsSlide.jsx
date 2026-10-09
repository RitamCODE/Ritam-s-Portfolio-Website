import { Fragment } from 'react';
import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { findingsSlide as copy } from '../../data/scientificQaWalkthrough';

function FindingsSlide() {
  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <ol className="walkthrough-chain is-stackable">
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

      <p className="walkthrough-aside walkthrough-aside-spaced">
        <i className="fa-solid fa-code-compare" aria-hidden="true" />
        {copy.confoundLabel}
      </p>
      <div className="walkthrough-cards">
        {copy.configs.map((config) => (
          <div className="walkthrough-card walkthrough-config" key={config.title}>
            <h5>{config.title}</h5>
            <dl>
              {config.rows.map(([term, detail]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <ul className="walkthrough-limits">
        {copy.limits.map((limit) => (
          <li key={limit}>
            <i className="fa-solid fa-scale-balanced" aria-hidden="true" />
            {limit}
          </li>
        ))}
      </ul>
      <p className="walkthrough-note-small">{copy.counts}</p>

      <div className="walkthrough-next">
        <span className="walkthrough-field-label">{copy.next.label}</span>
        <p>{copy.next.text}</p>
      </div>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} source={copy.source} />
    </>
  );
}

export default FindingsSlide;
