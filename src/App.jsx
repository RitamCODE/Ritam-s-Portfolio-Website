import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ResearchSection from './components/ResearchSection';
import ContactSection from './components/ContactSection';
import LandingIntro from './components/LandingIntro';
import {
  courseItems,
  education,
  experienceItems,
  patentItems,
  profile,
  projectItems,
  researchItems,
  techStack
} from './data/portfolioData';

function getInitialTheme() {
  const stored = window.localStorage.getItem('portfolio-theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialIntroState() {
  // A deep link asks for a section, not the intro. Playing it would freeze the page
  // (body.intro-active locks scrolling) and hide the target behind an opacity-0 main.
  const hash = window.location.hash;
  if (hash && hash !== '#home') {
    return 'hidden';
  }

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
  const [revealed, setRevealed] = useState(() => getInitialIntroState() === 'hidden');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setMenuOpen((open) => (open ? false : open));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (getInitialIntroState() === 'hidden') return undefined;

    // Functional updates so a skipped intro (skipIntro sets 'hidden' early) is never
    // resurrected by a timer that was already in flight.
    const enterTimer = window.setTimeout(() => {
      setIntroState((current) => (current === 'enter' ? 'exit' : current));
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

  // Once the 0.75s reveal transition has settled, drop the blur filter entirely.
  // A lingering `filter: blur(0)` keeps <main> promoted to one page-sized composited
  // layer, which re-rasterizes on a smooth-scroll jump and paints blank mid-scroll.
  useEffect(() => {
    if (introState !== 'hidden' || revealed) return undefined;

    const settleTimer = window.setTimeout(() => setRevealed(true), 800);
    return () => window.clearTimeout(settleTimer);
  }, [introState, revealed]);

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  // Clicking a nav link while the intro is still playing should jump straight to the
  // section rather than scroll into a locked, invisible page.
  const skipIntro = useCallback(() => {
    setIntroState((current) => (current === 'hidden' ? current : 'hidden'));
  }, []);

  const isReady = introState === 'hidden';

  return (
    <div className={`app-shell ${isReady ? 'ready' : ''} ${revealed ? 'revealed' : ''}`}>
      <LandingIntro state={introState} profile={profile} />
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        onNavigate={skipIntro}
        resumeLink={profile.resume}
      />

      <main>
        <Hero profile={profile} />
        <AboutSection
          about={profile.about}
          techStack={techStack}
          education={education}
          courses={courseItems}
          patents={patentItems}
        />
        <ExperienceSection experiences={experienceItems} />
        <ProjectsSection projects={projectItems} />
        <ResearchSection research={researchItems} />
      </main>

      <ContactSection profile={profile} />
    </div>
  );
}

export default App;
