import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
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
  const [headerHidden, setHeaderHidden] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setMenuOpen((open) => (open ? false : open));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GNOME Shell hides the top bar and brings it back when the pointer reaches the screen
  // edge. Touch devices have no pointer to reach that edge, so there the nav comes back on
  // an upward scroll instead — otherwise it would only be reachable from the top of the page.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const revealsOnScrollUp = window.matchMedia('(hover: none)').matches;
    const REVEAL_ZONE = 96;
    const PINNED_UNTIL = 160;

    let pointerNearTop = false;
    let lastY = window.scrollY;
    let frame = 0;

    const resolve = () => {
      frame = 0;
      const y = window.scrollY;
      const scrollingUp = y < lastY;
      lastY = y;
      setHeaderHidden(y > PINNED_UNTIL && !pointerNearTop && !(revealsOnScrollUp && scrollingUp));
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(resolve);
    };

    const onPointerMove = (event) => {
      const near = event.clientY <= REVEAL_ZONE;
      if (near === pointerNearTop) return;
      pointerNearTop = near;
      schedule();
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('pointermove', onPointerMove);
    };
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

  // Reveal-on-scroll. Waits for the intro so nothing animates behind an opacity-0 <main>.
  // `motion-ready` is what arms the hidden start state in CSS — if this effect never runs,
  // the content is simply visible rather than stuck invisible.
  useEffect(() => {
    if (introState !== 'hidden') return undefined;

    const targets = document.querySelectorAll(
      '.section-title, .about-card, .panel, .project-card, .experience-group-toggle, .experience-layout'
    );

    // Never arm the hidden state without a working observer to undo it, or the page
    // renders blank.
    if (!('IntersectionObserver' in window)) return undefined;

    targets.forEach((el) => el.classList.add('reveal'));
    setMotionReady(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      // Fires a little before the block is comfortably in view, so the ~0.9s reveal
      // has settled by the time the eye reaches it.
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [introState]);

  // Drives the nav's active-section indicator.
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], footer[id]');
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const toggleTheme = (event) => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reducedMotion) {
      setTheme(next);
      return;
    }

    // The circle grows from the toggle itself, so it needs the click coordinates and a
    // radius reaching the furthest corner of the viewport.
    const x = event?.clientX ?? window.innerWidth - 80;
    const y = event?.clientY ?? 40;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    // flushSync is required: React 18 would otherwise batch the state update to after the
    // transition snapshot, and the wipe would reveal the old theme.
    const transition = document.startViewTransition(() => flushSync(() => setTheme(next)));

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]
          },
          {
            duration: 480,
            easing: 'cubic-bezier(0.2, 0, 0, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      })
      // `ready` rejects when the transition is abandoned — the tab is hidden partway
      // through, or a second toggle supersedes this one. The theme has already been
      // applied by then, so the wipe is all that is lost and there is nothing to report.
      .catch(() => {});
  };

  // Clicking a nav link while the intro is still playing should jump straight to the
  // section rather than scroll into a locked, invisible page.
  const skipIntro = useCallback(() => {
    setIntroState((current) => (current === 'hidden' ? current : 'hidden'));
  }, []);

  const isReady = introState === 'hidden';

  return (
    <div
      className={`app-shell ${isReady ? 'ready' : ''} ${revealed ? 'revealed' : ''} ${
        motionReady ? 'motion-ready' : ''
      }`}
    >
      <LandingIntro state={introState} profile={profile} />
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isHidden={headerHidden && !menuOpen}
        activeSection={activeSection}
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
