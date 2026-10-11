// The trigger for every walkthrough deck: a full-width footer attached to the bottom of its
// card (project card or experience panel). The whole bar is the button. Three cells: the label
// on the left, an "Expand to explore" cue with the chevron in the center, the slide count on the
// right. On narrow screens CSS hides the count and the cue's text, leaving label and chevron;
// the label never goes. The class is `walkthrough-trigger` because `.walkthrough-footer` already
// names the dots-and-arrows row inside the deck.
function WalkthroughFooter({ label, count, expanded, controls, onToggle }) {
  return (
    <button
      type="button"
      className="walkthrough-trigger"
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onToggle}
    >
      <span className="walkthrough-trigger-lead">
        <i className="fa-solid fa-diagram-project walkthrough-trigger-icon" aria-hidden="true" />
        <span className="walkthrough-trigger-label">{label}</span>
      </span>
      <span className="walkthrough-trigger-cue">
        <span className="walkthrough-trigger-hint">
          {expanded ? 'Collapse walkthrough' : 'Expand to explore'}
        </span>
        <i className="fa-solid fa-chevron-down walkthrough-chevron" aria-hidden="true" />
      </span>
      <span className="walkthrough-trigger-count">{count} slides</span>
    </button>
  );
}

export default WalkthroughFooter;
