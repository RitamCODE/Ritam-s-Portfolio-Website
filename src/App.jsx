import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import CoursesSection from './components/CoursesSection';
import PatentsSection from './components/PatentsSection';
import ContactSection from './components/ContactSection';
import LandingIntro from './components/LandingIntro';
import { courseItems, education, experienceItems, patentItems, profile, projectItems, techStack } from './data/portfolioData';

function getInitialTheme() {
  const stored = window.localStorage.getItem('portfolio-theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialIntroState() {
  try {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return 'hidden';
    }
  } catch (error) {
    return 'hidden';
  }

  return 'enter';
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [introState, setIntroState] = useState(getInitialIntroState);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setMenuOpen(false);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (introState === 'hidden') return;

    const enterTimer = window.setTimeout(() => {
      setIntroState('exit');
    }, 1500);

    const exitTimer = window.setTimeout(() => {
      setIntroState('hidden');
    }, 2200);

    return () => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(exitTimer);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('intro-active', introState !== 'hidden');
    return () => document.body.classList.remove('intro-active');
  }, [introState]);

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const sortedProjects = useMemo(() => projectItems, []);
  const isReady = introState === 'hidden';

  return (
    <div className={`app-shell ${isReady ? 'ready' : ''}`}>
      <LandingIntro state={introState} profile={profile} />
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
        <ExperienceSection experiences={experienceItems} />
        <ProjectsSection projects={sortedProjects} />
        <CoursesSection courses={courseItems} />
        <PatentsSection patents={patentItems} />
      </main>

      <ContactSection profile={profile} />
    </div>
  );
}

export default App;
