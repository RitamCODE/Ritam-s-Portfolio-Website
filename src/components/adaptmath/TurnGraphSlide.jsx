import { useMemo, useState } from 'react';
import SourceLink from './SourceLink';
import useElementWidth from '../walkthrough/useElementWidth';
import { turnSlide as copy } from '../../data/adaptmathWalkthrough';

const COMPACT_BELOW = 450;
const NODE_HEIGHT = 34;

// Positions come from the measured width: a left-to-right flow when there is room, and a
// top-to-bottom one with the outcomes in two rows when there is not. Every number is in
// SVG user units, which equal CSS pixels because the viewBox matches the measured width.
function buildLayout(width) {
  const compact = width < COMPACT_BELOW;
  const nodes = {};

  if (compact) {
    const wide = Math.min(112, width * 0.42);
    const small = (width - 16) / 3;
    nodes.grade = { x: (width - wide) / 2, y: 4, w: wide };
    nodes.hold = { x: width - wide, y: 58, w: wide };
    nodes.remediation = { x: 0, y: 58, w: wide };
    nodes.bkt = { x: (width - wide) / 2, y: 115, w: wide };
    nodes.engagement = { x: (width - wide) / 2, y: 170, w: wide };
    copy.outcomes.forEach((id, index) => {
      nodes[id] = { x: (index % 3) * (small + 8), y: 251 + Math.floor(index / 3) * 56, w: small };
    });
  } else {
    const wide = width * 0.19;
    nodes.grade = { x: 0, y: 80, w: wide };
    nodes.hold = { x: 0, y: 182, w: wide };
    nodes.remediation = { x: width * 0.25, y: 139, w: wide };
    nodes.bkt = { x: width * 0.25, y: 80, w: wide };
    nodes.engagement = { x: width * 0.5, y: 80, w: wide };
    copy.outcomes.forEach((id, index) => {
      nodes[id] = { x: width * 0.77, y: index * 39, w: width * 0.23 };
    });
  }
  Object.values(nodes).forEach((node) => {
    node.h = NODE_HEIGHT;
  });

  const edgePath = (from, to) => {
    const a = nodes[from];
    const b = nodes[to];

    if (compact) {
      const ax = a.x + a.w / 2;
      const ay = a.y + a.h;
      const bx = b.x + b.w / 2;
      const by = b.y;
      if (from === 'remediation' || (from === 'grade' && to === 'hold')) {
        return `M${ax},${ay} V${ay + (from === 'remediation' ? 10 : 9)} H${bx} V${by}`;
      }
      if (from === 'grade' && to === 'bkt') {
        return `M${width * 0.57},${ay} V${by}`;
      }
      if (from === 'engagement') {
        const turn = 217;
        const index = copy.outcomes.indexOf(to);
        if (index >= 3) {
          const side = to === 'demote' ? 3 : to === 'end' ? width - 3 : width * 0.68;
          return `M${ax},${ay} V${turn} H${side} V${by - 10} H${bx} V${by}`;
        }
        return `M${ax},${ay} V${turn} H${bx} V${by}`;
      }
      return `M${ax},${ay} V${(ay + by) / 2} H${bx} V${by}`;
    }

    if (from === 'grade' && to === 'hold') {
      return `M${a.x + a.w / 2},${a.y + a.h} V${b.y}`;
    }
    if (from === 'remediation' && to === 'bkt') {
      return `M${a.x + a.w / 2},${a.y} V${b.y + b.h}`;
    }
    const ax = a.x + a.w;
    const ay = a.y + a.h / 2;
    const mid = (ax + b.x) / 2;
    return `M${ax},${ay} H${mid} V${b.y + b.h / 2} H${b.x}`;
  };

  return {
    compact,
    height: compact ? 358 : 230,
    nodes,
    edges: copy.edges.map(([from, to]) => ({ from, to, d: edgePath(from, to) }))
  };
}

function TurnGraphSlide() {
  const [scenarioId, setScenarioId] = useState(copy.scenarios[0].id);
  const [graphRef, width] = useElementWidth();
  const scenario = copy.scenarios.find((item) => item.id === scenarioId);
  const layout = useMemo(() => (width >= 10 ? buildLayout(width) : null), [width]);

  const activeNodes = new Set(scenario.path);
  const activeEdges = new Set(scenario.path.slice(0, -1).map((id, i) => `${id}>${scenario.path[i + 1]}`));
  const pathText = scenario.path.map((id) => copy.nodeLabels[id].join(' ')).join(' → ');

  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>
      <p className="walkthrough-badge">
        <i className="fa-solid fa-diagram-project" aria-hidden="true" />
        {copy.badge}
      </p>

      <div className="walkthrough-choices" role="group" aria-label={copy.scenarioLabel}>
        {copy.scenarios.map((item) => (
          <button
            key={item.id}
            type="button"
            className="walkthrough-choice"
            aria-pressed={item.id === scenarioId}
            onClick={() => setScenarioId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="walkthrough-graph" ref={graphRef}>
        {layout && (
          <svg
            viewBox={`0 0 ${width} ${layout.height}`}
            style={{ height: layout.height }}
            role="img"
            aria-label={copy.graphLabel}
          >
            <defs>
              {['neutral', 'active'].map((state) => (
                <marker
                  key={state}
                  id={`walkthrough-arrow-${state}`}
                  className={`walkthrough-marker is-${state}`}
                  markerWidth="6"
                  markerHeight="6"
                  refX="6"
                  refY="3"
                  orient="auto"
                  markerUnits="userSpaceOnUse"
                >
                  <path d="M0,0 L6,3 L0,6 Z" />
                </marker>
              ))}
            </defs>

            {layout.edges.map(({ from, to, d }) => {
              const on = activeEdges.has(`${from}>${to}`);
              return (
                <path
                  key={`${from}>${to}`}
                  d={d}
                  className={`graph-edge ${on ? 'is-active' : ''}`}
                  markerEnd={`url(#walkthrough-arrow-${on ? 'active' : 'neutral'})`}
                />
              );
            })}

            {Object.entries(layout.nodes).map(([id, node]) => {
              const on = activeNodes.has(id);
              return (
                <g key={id} className={`graph-node ${on ? 'is-active' : ''}`}>
                  <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="7" />
                  <text textAnchor="middle">
                    {copy.nodeLabels[id].map((line, i) => (
                      <tspan key={line} x={node.x + node.w / 2} y={node.y + 14 + i * 13}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}

            {!layout.compact && (
              <text className="graph-start" x="0" y="20">
                Answer submitted
              </text>
            )}
          </svg>
        )}
      </div>

      <div aria-live="polite">
        <p className="walkthrough-caption">{scenario.caption}</p>
        <p className="walkthrough-path">
          <strong>Path:</strong> {pathText}
        </p>
      </div>

      <SourceLink caveat={copy.caveat} source={copy.source} />
    </>
  );
}

export default TurnGraphSlide;
