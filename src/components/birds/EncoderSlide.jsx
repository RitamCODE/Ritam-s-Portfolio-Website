import { Fragment } from 'react';
import SourceLink from '../walkthrough/SourceLink';
import SkillsFooter from '../walkthrough/SkillsFooter';
import { encoderSlide as copy } from '../../data/birdWalkthrough';

function EncoderSlide() {
  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <ol className="walkthrough-chain is-stackable" aria-label={copy.diagramLabel}>
        {copy.chain.map((step, index) => (
          <Fragment key={step.name}>
            {index > 0 && (
              <li className="walkthrough-chain-arrow" aria-hidden="true">
                <i className="fa-solid fa-arrow-right" />
              </li>
            )}
            <li className={`walkthrough-system ${step.engine ? 'is-engine' : ''}`}>
              {step.name}
              {step.value && <span className="bird-dimension">{step.value}</span>}
              <small>{step.detail}</small>
            </li>
          </Fragment>
        ))}
      </ol>

      <div className="bird-channels" aria-label={copy.channelsLabel} role="group">
        {copy.channels.map((channel) => (
          <div
            className={`bird-channel ${channel.highlight ? 'is-single' : ''}`}
            key={channel.name}
          >
            <span className="bird-channel-bars" aria-hidden="true">
              {Array.from({ length: channel.count }, (_, i) => (
                <b key={i} />
              ))}
            </span>
            <span>
              <strong>{channel.count}</strong> {channel.count === 1 ? 'channel' : 'channels'}
              <small>{channel.name}</small>
            </span>
          </div>
        ))}
      </div>

      <p className="walkthrough-note-small">{copy.note}</p>

      <SkillsFooter skills={copy.demonstrated} />
      <SourceLink caveat={copy.caveat} />
    </>
  );
}

export default EncoderSlide;
