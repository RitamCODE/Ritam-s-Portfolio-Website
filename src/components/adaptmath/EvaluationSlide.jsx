import SourceLink from './SourceLink';
import { evaluationSlide as copy } from '../../data/adaptmathWalkthrough';

function EvaluationSlide() {
  return (
    <>
      <p className="walkthrough-kicker">{copy.kicker}</p>
      <h4 className="walkthrough-title">{copy.title}</h4>
      <p className="walkthrough-lead">{copy.lead}</p>

      <p className="walkthrough-meta">
        {copy.meta.map((item, index) => (
          <span key={item}>
            {index > 0 && <span aria-hidden="true"> · </span>}
            {item}
          </span>
        ))}
      </p>

      <table className="walkthrough-table" aria-label={copy.tableLabel}>
        <thead>
          <tr>
            <th scope="col" rowSpan={2} className="is-profile">
              Profile
            </th>
            {copy.groups.map((group) => (
              <th key={group} scope="colgroup" colSpan={2} className="is-group">
                {group}
              </th>
            ))}
          </tr>
          <tr>
            {copy.groups.flatMap((group) => [
              <th key={`${group}-adaptive`} scope="col" className="is-adaptive" aria-label="Adaptive">
                Adapt.
              </th>,
              <th key={`${group}-fixed`} scope="col" aria-label="Fixed baseline">
                Fixed
              </th>
            ])}
          </tr>
        </thead>
        <tbody>
          {copy.rows.map((row) => (
            <tr key={row.profile}>
              <th scope="row" className="is-profile">
                {row.profile}
              </th>
              {row.values.map((value, index) => (
                <td key={index} className={index % 2 === 0 ? 'is-adaptive' : undefined}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="walkthrough-findings">{copy.findings}</p>
      <p className="walkthrough-findings">{copy.bound}</p>
      <p className="walkthrough-review">
        <i className="fa-solid fa-check-double" aria-hidden="true" />
        {copy.review}
      </p>

      <SourceLink caveat={copy.caveat} source={copy.source} />
    </>
  );
}

export default EvaluationSlide;
