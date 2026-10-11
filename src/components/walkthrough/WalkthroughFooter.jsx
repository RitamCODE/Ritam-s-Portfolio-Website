// The trigger for every walkthrough deck: a full-width footer attached to the bottom of its
// card (project card or experience panel). The whole bar is the button. The slide count is
// hidden on narrow screens by CSS; the label never is. The class is `walkthrough-trigger`
// because `.walkthrough-footer` already names the dots-and-arrows row inside the deck.
function WalkthroughFooter({ label, count, expanded, controls, onToggle }) {
  return (
    <button
      type="button"
      className="walkthrough-trigger"
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onToggle}
    >
      <i className="fa-solid fa-diagram-project walkthrough-trigger-icon" aria-hidden="true" />
      <span className="walkthrough-trigger-label">{label}</span>
      <span className="walkthrough-trigger-count">{count} slides</span>
      <i className="fa-solid fa-chevron-down walkthrough-chevron" aria-hidden="true" />
    </button>
  );
}

export default WalkthroughFooter;
