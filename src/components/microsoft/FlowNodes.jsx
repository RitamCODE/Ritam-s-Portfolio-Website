import { Fragment } from 'react';

// The three-part left-to-right diagram shared by the purpose and retrieval slides. Parts in
// `active` (or flagged `accent`) take the selected colour; arrows sit between them.
function FlowNodes({ nodes, active = [] }) {
  return nodes.map((node, index) => (
    <Fragment key={node.id}>
      {index > 0 && <i className="fa-solid fa-arrow-right msft-arrow" aria-hidden="true" />}
      <div
        className={`msft-node ${node.accent || active.includes(node.id) ? 'is-active' : ''}`}
      >
        <i className={`fa-solid ${node.icon}`} aria-hidden="true" />
        <div>
          <strong>{node.title}</strong>
          <small>{node.text}</small>
        </div>
      </div>
    </Fragment>
  ));
}

export default FlowNodes;
