const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#research', label: 'Research' },
  { href: '#contact', label: 'Contact' }
];

function Header({
  menuOpen,
  setMenuOpen,
  isHidden,
  activeSection,
  isDark,
  onThemeToggle,
  onNavigate,
  resumeLink
}) {
  const handleNavClick = () => {
    setMenuOpen(false);
    onNavigate();
  };

  return (
    <header className={`site-header ${isHidden ? 'is-hidden' : ''}`}>
      <a className="brand" href="#home" onClick={handleNavClick}>
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
          <a
            key={item.href}
            href={item.href}
            className={item.href === `#${activeSection}` ? 'active' : ''}
            onClick={handleNavClick}
          >
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

      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}

export default Header;
