// A slide's closing "Project notes": a short caveat paragraph that expands on demand, with
// optional public links. It replaces SourceLink where a slide needs more than one line. The
// slide's size changes when it opens, which the deck's slide observer picks up.
function ProjectNotes({ summary, text, links }) {
  return (
    <details className="walkthrough-notes">
      <summary>{summary}</summary>
      <p>{text}</p>
      {links?.length > 0 && (
        <ul className="walkthrough-notes-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}

export default ProjectNotes;
