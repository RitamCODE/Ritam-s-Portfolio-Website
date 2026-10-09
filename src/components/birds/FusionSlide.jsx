import { Fragment, useState } from 'react';
import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { fusionSlide as copy } from '../../data/birdWalkthrough';

function FusionSlide() {
  const [traceId, setTraceId] = useState(copy.initialTrace);
  const trace = copy.traces.find((item) => item.id === traceId);

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <div className="walkthrough-choices" role="group" aria-label={copy.traceLabel}>
        {copy.traces.map((item) => (
          <button
            key={item.id}
            type="button"
            className="walkthrough-choice"
            aria-pressed={item.id === traceId}
            onClick={() => setTraceId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="walkthrough-cards bird-branches">
        {copy.branches.map((branch) => (
          <div
            className={`walkthrough-card bird-branch ${
              traceId === 'audio' && branch.id === 'audio' ? 'is-traced' : ''
            }`}
            key={branch.id}
          >
            <h5>
              <i className={`fa-solid ${branch.icon}`} aria-hidden="true" />
              {branch.title}
            </h5>
            <p>{branch.subtitle}</p>
            <ol className="bird-steps">
              {branch.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <div className="bird-merge" aria-hidden="true">
        <span />
        <span />
      </div>

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
      <p className="bird-detail" aria-live="polite">
        {trace.detail}
      </p>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} />
    </>
  );
}

export default FusionSlide;
