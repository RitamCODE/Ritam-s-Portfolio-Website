// A group of toggle buttons for one local demonstration. `stages` are { id, label } pairs.
function Choices({ label, stages, value, onChange }) {
  return (
    <div className="walkthrough-choices" role="group" aria-label={label}>
      {stages.map((stage) => (
        <button
          key={stage.id}
          type="button"
          className="walkthrough-choice"
          aria-pressed={stage.id === value}
          onClick={() => onChange(stage.id)}
        >
          {stage.label}
        </button>
      ))}
    </div>
  );
}

export default Choices;
