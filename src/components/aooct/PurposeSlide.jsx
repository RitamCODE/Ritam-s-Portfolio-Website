import { Fragment } from 'react';
import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { purposeSlide as copy } from '../../data/aoOctWalkthrough';

// Decorative glyphs under each step: intact layers, deformed layers, and a curve that
// departs from its baseline. Drawn with CSS and one tiny path, not taken from any scan.
function Glyph({ kind }) {
  if (kind === 'spark') {
    return (
      <svg className="aooct-spark" viewBox="0 0 160 44" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 30 L40 30 L52 29 L65 9 L78 35 L90 21 L108 30 L160 30" />
      </svg>
    );
  }
  return (
    <span className={`aooct-layers ${kind === 'disrupted' ? 'is-disrupted' : ''}`} aria-hidden="true">
      <b />
      <b />
      <b />
    </span>
  );
}

function PurposeSlide() {
  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <div className="aooct-flow" role="img" aria-label={copy.diagramLabel}>
        {copy.flow.map((node, index) => (
          <Fragment key={node.title}>
            {index > 0 && <i className="fa-solid fa-arrow-right aooct-flow-arrow" aria-hidden="true" />}
            <div className={`aooct-flow-node ${node.highlight ? 'is-highlight' : ''}`}>
              <i className={`fa-solid ${node.icon}`} aria-hidden="true" />
              <strong>{node.title}</strong>
              <small>{node.text}</small>
              <Glyph kind={node.glyph} />
            </div>
          </Fragment>
        ))}
      </div>

      <p className="walkthrough-aside aooct-aside">
        <i className="fa-solid fa-circle-info" aria-hidden="true" />
        {copy.definitions}
      </p>
      <p className="aooct-callout">
        <strong>{copy.contribution.label}</strong>
        {copy.contribution.text}
      </p>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} />
    </>
  );
}

export default PurposeSlide;
