// Up to two skill / applied-contribution pairs, shown just above a slide's source line.
// `label` lets a slide qualify the heading (e.g. work that was only a prototype).
function SkillsFooter({ skills, label = 'Skills demonstrated' }) {
  if (!skills?.length) return null;

  return (
    <div className="walkthrough-demonstrated" role="group" aria-label={label}>
      <p className="walkthrough-demonstrated-label" aria-hidden="true">
        {label}
      </p>
      <dl>
        {skills.map((skill) => (
          <div key={skill.name}>
            <dt>{skill.name}</dt>
            <dd>{skill.applied}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default SkillsFooter;
