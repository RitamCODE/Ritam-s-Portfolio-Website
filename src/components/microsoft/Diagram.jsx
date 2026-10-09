import useElementWidth from '../walkthrough/useElementWidth';

// Below this width a diagram's columns no longer fit, so its parts stack. The measure is the
// diagram's own width, not the viewport's: inside the experience panel the slide is narrower
// than the screen by the width of the company tabs.
const COMPACT_BELOW = 460;

// A labelled diagram that reports `is-compact` to its stylesheet when it runs out of room.
// `variant` picks the column template ('flow' for three parts, 'pair' for two).
function Diagram({ variant, label, children }) {
  const [ref, width] = useElementWidth();
  const compact = width > 0 && width < COMPACT_BELOW;

  return (
    <div
      className={`msft-diagram msft-${variant} ${compact ? 'is-compact' : ''}`}
      ref={ref}
      role="img"
      aria-label={label}
    >
      {children}
    </div>
  );
}

export default Diagram;
