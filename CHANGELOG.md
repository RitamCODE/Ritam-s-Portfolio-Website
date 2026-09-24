# Changelog

Notable changes to the portfolio site. Newest first.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- AdaptMATH at the top of Projects — a K-5 adaptive math tutor built for the Nerdy
  AI Hackathon, with links to the repo and a walkthrough video.
- Research section with its own nav item, holding the AO-OCT retinal scan work.
- Project cards can now carry more than one link, so a card can point at both a
  repo and a demo.
- Reusable project card, shared by the Projects and Research sections.
- `CLAUDE.md` documenting project conventions, and this changelog.

### Changed

- About Me rewritten as four paragraphs on how I actually work, with AdaptMATH
  linked to its repo; the degree sentence is gone, since Education already says it.
- Tech Stack split into six labeled groups — AI & ML, LLM Systems & Agents,
  Languages, Backend & Web, Cloud & Infrastructure, Data — instead of one flat run
  of pills, and refreshed: LangGraph, Transformers, FastAPI, Django, Docker and
  MLflow in; Postman, HTML/CSS and standalone Azure out.
- About now reads as About Me beside Tech Stack, with Education full width below
  both instead of sharing a column with the stack.
- Hero tagline now reads "Your friendly neighborhood AI Engineer".
- The Ohio State master's degree now reads as complete — `Aug 2024 - May 2026`
  in Education.
- "Fun Projects and Research" split into a Projects section and a Research section.
- Top nav trimmed to About, Experience, Projects, Research, Contact.
- Courses (WSDL) and the design patents now live inside the About section.
- Nav links clicked during the landing intro skip straight to the target section
  instead of scrolling into a locked page.
- Deep links (`/#projects` and friends) now bypass the landing intro entirely.
- Teaching Assistant bullets (Experience, Academia, Ohio State) rewritten with
  specifics: the ASP.NET/EF Core/React/Auth0/GitHub Actions stack maintained for
  the lab curriculum, the .NET 6 to .NET 8 migration work, and the grading/office
  hours responsibilities.

### Fixed

- Blank white screen for a second or two when jumping to a section from the nav.
  The reveal animation left a blur filter on `<main>`, keeping the whole page as a
  single oversized composited layer that repainted blank mid-scroll; the filter is
  now dropped once the intro reveal settles.
- Section headings landed behind the fixed header when following an anchor link.
- A skipped landing intro could reappear when an already-scheduled timer fired.
- The listener that closes the mobile menu no longer sets state on every scroll
  frame, and is registered as passive.

### Removed

- Standalone Courses and Design Patents sections — the content moved into About
  rather than being dropped.
- Pre-React site leftovers: `css/style.css`, `js/main.js`, `js/particles-config.js`,
  and the unused `CodeRain` component.

## 2026-02-12

### Added

- Industry/academia toggle in the Experience section, plus a teaching role.
- Courses section, with certificates for DeltaCube and WSDL.

### Changed

- Design Patents section updated.

## 2026-02-10

### Fixed

- `@tsparticles/react` added to `package.json`; particles were missing from builds.

## 2026-02-09

### Added

- Particle background on the hero.
- Animated landing intro.
- Copyright notice in the footer.

### Changed

- New profile picture.
- Header and section polish.

## 2026-02-08

### Added

- Netlify deploy config (`netlify.toml`) with an SPA catch-all rewrite.
- Projects section.

### Changed

- Site rebuilt as a Vite + React single-page app.
- Skills, education and about consolidated into a single About section; Experience
  section introduced.

### Fixed

- Root-level favicon assets and icon links corrected for the Netlify deploy.

## 2026-02-07

### Added

- Dark/light mode toggle, persisted across visits.

### Changed

- Left-aligned page structure with a centered landing screen.
- Images moved into an assets folder; inline JavaScript split into `js/`.

## 2023-12-11

### Added

- Favicon.

### Changed

- Social media links repositioned.
- Contact section removed and styling reworked.
