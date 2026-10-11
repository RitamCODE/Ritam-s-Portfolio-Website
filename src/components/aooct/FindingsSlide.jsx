import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { findingsSlide as copy } from '../../data/aoOctWalkthrough';

function FindingsSlide() {
  const { global, local } = copy;

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <span className="walkthrough-field-label aooct-group-label">{global.label}</span>
      <div className="aooct-panel">
        <div className="aooct-panel-head">
          <strong>{global.chartTitle}</strong>
          <span className="aooct-scale">{global.chartScale}</span>
        </div>
        <div role="img" aria-label={global.chartLabel}>
          {global.bars.map((bar) => (
            <div className={`aooct-bar ${bar.amd ? 'is-amd' : ''}`} key={bar.label} aria-hidden="true">
              <div className="aooct-bar-label">
                <span>{bar.label}</span>
                <strong>{bar.value.toFixed(4)}</strong>
              </div>
              <div className="aooct-bar-track">
                <span style={{ width: `${bar.value * 100}%` }} />
              </div>
            </div>
          ))}
          <div className="aooct-bar-axis" aria-hidden="true">
            <span>0</span>
            <span>1</span>
          </div>
        </div>
      </div>
      <dl className="aooct-stats">
        {global.stats.map((stat) => (
          <div key={stat.value}>
            <dt>{stat.value}</dt>
            <dd>{stat.text}</dd>
          </div>
        ))}
      </dl>

      <span className="walkthrough-field-label aooct-group-label">{local.label}</span>
      <p className="aooct-callout">{local.text}</p>

      <p className="walkthrough-aside aooct-aside">
        <i className="fa-solid fa-circle-info" aria-hidden="true" />
        {copy.note}
      </p>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} />
    </>
  );
}

export default FindingsSlide;
