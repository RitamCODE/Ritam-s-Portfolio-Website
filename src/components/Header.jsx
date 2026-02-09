const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' }
];

function Header({ menuOpen, setMenuOpen, isDark, onThemeToggle, resumeLink }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
        RM
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
      </button>

      <nav className={`site-nav ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button
          className="theme-toggle"
          type="button"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={onThemeToggle}
        >
          <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
        </button>
        <a className="resume-link" href={resumeLink} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </div>
    </header>
  );
}

export default Header;
