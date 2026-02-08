import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import { education, experienceItems, profile, projectItems, techStack } from './data/portfolioData';

function getInitialTheme() {
  const stored = window.localStorage.getItem('portfolio-theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeExperience, setActiveExperience] = useState(experienceItems[0]?.id);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setMenuOpen(false);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const sortedProjects = useMemo(() => projectItems, []);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        resumeLink={profile.resume}
      />

      <main>
        <Hero profile={profile} />
        <AboutSection about={profile.about} techStack={techStack} education={education} />
        <ExperienceSection
          experiences={experienceItems}
          activeId={activeExperience}
          onSelect={setActiveExperience}
        />
        <ProjectsSection projects={sortedProjects} />
      </main>

      <ContactSection profile={profile} />
    </>
  );
}

export default App;
