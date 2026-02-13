import { useEffect, useMemo, useState } from 'react';

function ExperienceSection({ experiences }) {
  const groupedExperience = useMemo(
    () => ({
      industry: experiences.filter((item) => item.category === 'industry'),
      academia: experiences.filter((item) => item.category === 'academia')
    }),
    [experiences]
  );

  const groupOrder = ['industry', 'academia'];
  const groupLabels = {
    industry: 'Industry',
    academia: 'Academia'
  };

  const availableGroups = groupOrder.filter((group) => groupedExperience[group].length > 0);

  const [activeGroup, setActiveGroup] = useState(availableGroups[0] || 'industry');
  const [activeIds, setActiveIds] = useState(() => ({
    industry: groupedExperience.industry[0]?.id || null,
    academia: groupedExperience.academia[0]?.id || null
  }));

  useEffect(() => {
    if (!availableGroups.includes(activeGroup)) {
      setActiveGroup(availableGroups[0] || 'industry');
    }
  }, [activeGroup, availableGroups]);

  useEffect(() => {
    setActiveIds((prev) => {
      const next = { ...prev };

      groupOrder.forEach((group) => {
        const list = groupedExperience[group];
        const exists = list.some((item) => item.id === prev[group]);

        if (!exists) {
          next[group] = list[0]?.id || null;
        }
      });

      return next;
    });
  }, [groupedExperience]);

  const activeList = groupedExperience[activeGroup] || [];
  const selectedId = activeIds[activeGroup] || activeList[0]?.id || null;
  const activeExperience = activeList.find((item) => item.id === selectedId) || activeList[0] || null;

  return (
    <section className="section" id="experience">
      <h2 className="section-title">Where I Have Worked</h2>

      <div className="experience-group-toggle" role="tablist" aria-label="Experience category">
        {availableGroups.map((group) => (
          <button
            key={group}
            type="button"
            className={group === activeGroup ? 'active' : ''}
            onClick={() => setActiveGroup(group)}
          >
            {groupLabels[group]}
          </button>
        ))}
      </div>

      <div className="experience-layout">
        <div className="experience-tabs" role="tablist" aria-label={`${groupLabels[activeGroup]} experience list`}>
          {activeList.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === selectedId ? 'active' : ''}
              onClick={() => setActiveIds((prev) => ({ ...prev, [activeGroup]: item.id }))}
            >
              {item.company}
            </button>
          ))}
        </div>

        {activeExperience && (
          <article className="experience-panel">
            <div className="experience-head">
              <h3>
                {activeExperience.role} <span>@ {activeExperience.company}</span>
              </h3>
              <p>{activeExperience.duration}</p>
            </div>
            <p className="experience-location">{activeExperience.location}</p>
            {activeExperience.certificate && (
              <a
                className="experience-link"
                href={activeExperience.certificate}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Certificate <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
              </a>
            )}
            <ul>
              {activeExperience.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        )}
      </div>
    </section>
  );
}

export default ExperienceSection;
