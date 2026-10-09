import { useState } from 'react';
import SourceLink from './SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { bktSlide as copy } from '../../data/adaptmathWalkthrough';
import { BKT_DEFAULTS, nextRun, updateMastery } from '../../utils/bkt';

const percent = (value) => `${(value * 100).toFixed(2)}%`;

function BktSlide() {
  const [mastery, setMastery] = useState(BKT_DEFAULTS.initial);
  const [run, setRun] = useState(0);
  const [message, setMessage] = useState(copy.startMessage);

  const confirmed = run >= BKT_DEFAULTS.requiredRun;
  const shown = Math.min(run, BKT_DEFAULTS.requiredRun);

  const observe = (kind) => {
    if (kind === 'skip') {
      // Blank or rapid answers carry no signal: nothing updates, nothing is consumed.
      setMessage(copy.skipMessage);
      return;
    }
    const next = updateMastery(mastery, kind === 'correct');
    const nextCount = nextRun(next, run);
    setMastery(next);
    setRun(nextCount);

    let outcome = 'Below the threshold; the sustained run resets.';
    if (nextCount >= BKT_DEFAULTS.requiredRun) {
      outcome = confirmed ? 'The sustained-evidence gate stays passed.' : 'The sustained-evidence gate now passes.';
    } else if (next >= BKT_DEFAULTS.threshold) {
      outcome = 'Above the threshold; sustained evidence still matters.';
    }
    setMessage(`${percent(mastery)} → ${percent(next)}. ${outcome}`);
  };

  const restart = () => {
    setMastery(BKT_DEFAULTS.initial);
    setRun(0);
    setMessage(copy.startMessage);
  };

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <div className="walkthrough-example">
        <div className="walkthrough-example-head">
          <span>
            {copy.exampleTitle}
            <br />
            {copy.exampleSubtitle}
          </span>
          <strong className="walkthrough-value">{percent(mastery)}</strong>
        </div>

        <div className="walkthrough-meter-wrap">
          <div
            className="walkthrough-meter"
            role="meter"
            aria-label={copy.meterLabel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Number((mastery * 100).toFixed(2))}
            aria-valuetext={percent(mastery)}
          >
            <div className="walkthrough-meter-fill" style={{ width: `${mastery * 100}%` }} />
          </div>
          <span className="walkthrough-threshold" aria-hidden="true" />
          <span className="walkthrough-threshold-label" aria-hidden="true">
            {copy.thresholdLabel}
          </span>
        </div>

        <div className="walkthrough-gate">
          <span className="walkthrough-pips" aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <span key={n} className={`walkthrough-pip ${n <= run ? 'is-done' : ''}`}>
                {n <= run ? '✓' : n}
              </span>
            ))}
          </span>
          <span>{confirmed ? 'Sustained mastery confirmed' : `${shown} / 3 sustained observations`}</span>
        </div>
        <p className="walkthrough-note-small">{copy.gateRule}</p>

        <div className="walkthrough-choices">
          {copy.actions.map((action) => (
            <button key={action.id} type="button" className="walkthrough-choice" onClick={() => observe(action.id)}>
              {action.label}
            </button>
          ))}
          <button type="button" className="walkthrough-text-button" onClick={restart}>
            {copy.restartLabel}
          </button>
        </div>
        <p className="walkthrough-message" aria-live="polite">
          {message}
        </p>
      </div>

      <p className="walkthrough-note-small">{copy.parameters}</p>
      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} source={copy.source} />
    </>
  );
}

export default BktSlide;
