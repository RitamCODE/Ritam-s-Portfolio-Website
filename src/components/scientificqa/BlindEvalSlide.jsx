import { Fragment, useState } from 'react';
import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { evaluationSlide as copy } from '../../data/scientificQaWalkthrough';

function BlindEvalSlide() {
  const [revealed, setRevealed] = useState(false);

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

      <div className="walkthrough-eval-head">
        <span className="walkthrough-field-label">{copy.exampleLabel}</span>
        <button
          type="button"
          className="walkthrough-choice"
          aria-pressed={revealed}
          onClick={() => setRevealed((value) => !value)}
        >
          {copy.revealLabel}
        </button>
      </div>
      <p className="walkthrough-question">{copy.question}</p>
      <p className="walkthrough-note-small">{copy.reference}</p>

      <div className="walkthrough-answers">
        {copy.answers.map((answer) => (
          <div className="walkthrough-answer" key={answer.id}>
            <span className="walkthrough-answer-head">
              Answer {answer.id}
              {revealed && <em>{answer.model}</em>}
            </span>
            <p>{answer.text}</p>
          </div>
        ))}
      </div>
      <p className="walkthrough-note-small" aria-live="polite">
        {revealed ? copy.revealedStatus : copy.hiddenStatus}
      </p>

      <div className="walkthrough-judgment">
        <span className="walkthrough-field-label">{copy.judgment.label}</span>
        <p>
          <strong>{copy.judgment.preferred}</strong> {copy.judgment.quote}
        </p>
        <p className="walkthrough-effect">{copy.judgment.lesson}</p>
      </div>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} source={copy.source} />
    </>
  );
}

export default BlindEvalSlide;
