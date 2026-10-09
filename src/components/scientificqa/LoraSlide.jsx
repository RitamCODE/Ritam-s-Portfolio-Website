import { useState } from 'react';
import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { loraSlide as copy } from '../../data/scientificQaWalkthrough';

function LoraSlide() {
  const [path, setPath] = useState(copy.initialPath);
  const active = copy.paths[path];

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <div className="walkthrough-lora" role="img" aria-label={copy.diagramLabel}>
        <div className="walkthrough-weight">
          <i className="fa-solid fa-lock" aria-hidden="true" />
          <strong>{copy.base.title}</strong>
          <small>{copy.base.detail}</small>
          <span className="walkthrough-weight-state">{copy.base.state}</span>
        </div>
        <i className="fa-solid fa-plus walkthrough-lora-op" aria-hidden="true" />
        <div className="walkthrough-weight is-adapter">
          <i className="fa-solid fa-sliders" aria-hidden="true" />
          <strong>{copy.adapter.title}</strong>
          <small>Low-rank update</small>
          <span className="walkthrough-weight-state">{copy.adapter.state}</span>
        </div>
        <i className="fa-solid fa-arrow-right walkthrough-lora-op" aria-hidden="true" />
        <div className="walkthrough-weight">
          <i className="fa-solid fa-microchip" aria-hidden="true" />
          <strong>{copy.result.title}</strong>
          <small>{copy.result.detail}</small>
        </div>
      </div>

      <div className="walkthrough-choices" role="group" aria-label={copy.pathsLabel}>
        {Object.entries(copy.paths).map(([id, item]) => (
          <button
            key={id}
            type="button"
            className="walkthrough-choice"
            aria-pressed={id === path}
            onClick={() => setPath(id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="walkthrough-training" aria-live="polite">
        <div>
          <span className="walkthrough-field-label">{copy.signalLabel}</span>
          <h5>{active.signalName}</h5>
          <p>{active.signalText}</p>
        </div>
        <div>
          <span className="walkthrough-field-label">Adapter</span>
          <h5>{active.adapterDetail}</h5>
          <p>{active.adapterSize}</p>
          <p className="walkthrough-note-small">{active.note}</p>
        </div>
      </div>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} source={copy.source} />
    </>
  );
}

export default LoraSlide;
