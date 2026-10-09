// Up to two skill / applied-contribution pairs, shown just above a slide's source line.
function SkillsFooter({ skills }) {
  if (!skills?.length) return null;

  return (
    <div className="walkthrough-demonstrated" role="group" aria-label="Skills demonstrated">
      <p className="walkthrough-demonstrated-label" aria-hidden="true">
        Skills demonstrated
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
