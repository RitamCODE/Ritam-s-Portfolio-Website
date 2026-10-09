function SourceLink({ caveat, source }) {
  return (
    <div className="walkthrough-source">
      <span>{caveat}</span>
      {source && (
        <a href={source.href} target="_blank" rel="noopener noreferrer">
          {source.label} <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export default SourceLink;
