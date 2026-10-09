import { purposeSlide as copy } from '../../data/scientificQaWalkthrough';

function PurposeSlide() {
  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead is-tight">{copy.intro}</p>
      <p className="walkthrough-lead">{copy.motivation}</p>

      <div className="walkthrough-flow" role="img" aria-label={copy.diagramLabel}>
        <div className="walkthrough-origin">
          <i className="fa-solid fa-brain" aria-hidden="true" />
          <div>
            <strong>{copy.origin.title}</strong>
            <small>{copy.origin.caption}</small>
          </div>
        </div>

        <div className="walkthrough-branches">
          {copy.branches.map((branch) => (
            <div className="walkthrough-branch" key={branch.title}>
              <span className="walkthrough-branch-label">
                <i className={`fa-solid ${branch.icon}`} aria-hidden="true" />
                {branch.label}
              </span>
              <strong>{branch.title}</strong>
              <p>{branch.text}</p>
              <span className="walkthrough-branch-method">
                <i className="fa-solid fa-sliders" aria-hidden="true" />
                {copy.method}
              </span>
            </div>
          ))}
        </div>

        <div className="walkthrough-outcome">
          <i className="fa-solid fa-arrow-down" aria-hidden="true" />
          <strong>{copy.outcome.title}</strong>
          <small>
            {copy.outcome.criteria.map((criterion, index) => (
              <span key={criterion}>
                {index > 0 && <span aria-hidden="true"> · </span>}
                {criterion}
              </span>
            ))}
          </small>
        </div>
      </div>

      <div className="walkthrough-source">
        <span className="walkthrough-purpose-line">
          <i className="fa-solid fa-bullseye" aria-hidden="true" />
          {copy.goal}
        </span>
        <a href={copy.source.href} target="_blank" rel="noopener noreferrer">
          {copy.source.label} <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
        </a>
      </div>
    </>
  );
}

export default PurposeSlide;
