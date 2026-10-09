import { useState } from 'react';
import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { diagnosisSlide as copy } from '../../data/adaptmathWalkthrough';

function DiagnosisSlide() {
  const [answer, setAnswer] = useState(copy.initialAnswer);
  const diagnosis = copy.diagnoses[answer];

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <div className="walkthrough-choices" role="group" aria-label={copy.choicesLabel}>
        <span className="walkthrough-note-small">{copy.promptLabel}</span>
        {copy.answers.map((value) => (
          <button
            key={value}
            type="button"
            className="walkthrough-choice"
            aria-pressed={value === answer}
            onClick={() => setAnswer(value)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="walkthrough-diagnosis">
        <div className="walkthrough-equation">
          <strong>{copy.equation}</strong>
          <small>{copy.equationCaption}</small>
        </div>
        <div className="walkthrough-result" aria-live="polite">
          <h5>{diagnosis.name}</h5>
          <p className="walkthrough-hint-copy">“{diagnosis.hint}”</p>
          <p className="walkthrough-effect">{diagnosis.effect}</p>
        </div>
      </div>

      <ol className="walkthrough-ladder" aria-label={copy.ladderLabel}>
        {copy.ladder.map((step) => (
          <li key={step.title}>
            <strong>{step.title}</strong>
            {step.text}
          </li>
        ))}
      </ol>

      <p className="walkthrough-note-small">{copy.note}</p>
      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} source={copy.source} />
    </>
  );
}

export default DiagnosisSlide;
