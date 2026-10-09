import { useLayoutEffect, useRef, useState } from 'react';
import useElementWidth from '../walkthrough/useElementWidth';
import { purposeSlide as copy } from '../../data/adaptmathWalkthrough';

const COMPACT_BELOW = 460;

// Curves from each input into the hub and from the hub out to each output, measured from
// the laid-out boxes so they follow the grid at any width.
function buildConnectors(diagram, nodes, compact) {
  const base = diagram.getBoundingClientRect();
  const box = (element) => {
    const rect = element.getBoundingClientRect();
    return { x: rect.x - base.x, y: rect.y - base.y, w: rect.width, h: rect.height };
  };
  const hub = box(nodes.hub);

  return copy.paths.flatMap((_, index) => {
    const source = box(nodes.from[index]);
    const target = box(nodes.to[index]);

    if (compact) {
      const sx = source.x + source.w / 2;
      const sy = source.y + source.h;
      const tx = target.x + target.w / 2;
      const hx = hub.x + hub.w / 2;
      const inMid = (sy + hub.y) / 2;
      const outMid = (hub.y + hub.h + target.y) / 2;
      return [
        `M${sx},${sy} C${sx},${inMid} ${hx},${inMid} ${hx},${hub.y}`,
        `M${hx},${hub.y + hub.h} C${hx},${outMid} ${tx},${outMid} ${tx},${target.y}`
      ];
    }

    const sx = source.x + source.w;
    const sy = source.y + source.h / 2;
    const ty = target.y + target.h / 2;
    const hy = hub.y + hub.h / 2;
    const inMid = (sx + hub.x) / 2;
    const outMid = (hub.x + hub.w + target.x) / 2;
    return [
      `M${sx},${sy} C${inMid},${sy} ${inMid},${hy} ${hub.x},${hy}`,
      `M${hub.x + hub.w},${hy} C${outMid},${hy} ${outMid},${ty} ${target.x},${ty}`
    ];
  });
}

function PurposeNode({ node, output, nodeRef, className }) {
  return (
    <div className={`walkthrough-node ${output ? 'is-output' : ''} ${className}`} ref={nodeRef}>
      <i className={`fa-solid ${node.icon}`} aria-hidden="true" />
      <div>
        <strong>{node.title}</strong>
        <small>{node.text}</small>
      </div>
    </div>
  );
}

function PurposeSlide() {
  const [diagramRef, width] = useElementWidth();
  const nodes = useRef({ from: [], to: [], hub: null });
  const [connectors, setConnectors] = useState({ size: null, paths: [] });
  const compact = width > 0 && width < COMPACT_BELOW;

  useLayoutEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram || !width) return;
    const { width: w, height: h } = diagram.getBoundingClientRect();
    setConnectors({ size: [w, h], paths: buildConnectors(diagram, nodes.current, compact) });
  }, [diagramRef, width, compact]);

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.intro}</p>
      <p className="walkthrough-aside">
        <i className="fa-solid fa-route" aria-hidden="true" />
        {copy.challenge}
      </p>

      <div
        className={`walkthrough-purpose ${compact ? 'is-compact' : ''}`}
        ref={diagramRef}
        role="img"
        aria-label={copy.diagramLabel}
      >
        {connectors.size && (
          <svg
            className="walkthrough-connections"
            viewBox={`0 0 ${connectors.size[0]} ${connectors.size[1]}`}
            aria-hidden="true"
          >
            <defs>
              <marker
                id="walkthrough-purpose-arrow"
                className="walkthrough-marker"
                markerWidth="6"
                markerHeight="6"
                refX="6"
                refY="3"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path d="M0,0 L6,3 L0,6 Z" />
              </marker>
            </defs>
            {connectors.paths.map((d) => (
              <path key={d} d={d} markerEnd="url(#walkthrough-purpose-arrow)" />
            ))}
          </svg>
        )}

        {copy.paths.map((path, index) => (
          <PurposeNode
            key={path.from.title}
            node={path.from}
            nodeRef={(node) => (nodes.current.from[index] = node)}
            className={`purpose-from-${index}`}
          />
        ))}
        <div className="walkthrough-hub" ref={(node) => (nodes.current.hub = node)}>
          <span className="walkthrough-hub-mark" aria-hidden="true">
            <i className="fa-solid fa-signs-post" />
          </span>
          <strong>{copy.hub.title}</strong>
          <small>{copy.hub.caption}</small>
        </div>
        {copy.paths.map((path, index) => (
          <PurposeNode
            key={path.to.title}
            node={path.to}
            output
            nodeRef={(node) => (nodes.current.to[index] = node)}
            className={`purpose-to-${index}`}
          />
        ))}
      </div>

      <div className="walkthrough-source">
        <span className="walkthrough-purpose-line">
          <i className="fa-solid fa-seedling" aria-hidden="true" />
          {copy.purpose}
        </span>
        <span>{copy.status}</span>
      </div>
    </>
  );
}

export default PurposeSlide;
