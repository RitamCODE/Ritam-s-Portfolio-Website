# Changelog

Notable changes to the portfolio site. Newest first.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- Sections now animate into view as you scroll, rising and fading in with their cards
  staggered rather than appearing fully formed. Runs once per element.
- Cards, tags, buttons and links respond to the cursor: project cards lift and pick up
  an accent border, tags brighten, buttons lift on hover and compress on press, and
  inline links grow a wiping underline.
- The nav shows which section you are in, with an accent underline that moves between
  items as you scroll, plus a thin progress line across the header.
- Switching between companies or Industry/Academia now crossfades instead of swapping
  instantly.
- Changing the theme plays a circular wipe spreading from the toggle itself. Falls back
  to an instant swap where the View Transitions API is unavailable.
- The header now auto-hides like the GNOME Shell top bar: it slides away once you
  scroll past the top of the page and returns when the pointer reaches the top edge
  of the window. It stays put while the mobile menu is open, comes back on an upward
  scroll on touch devices (which have no pointer to reach the edge), reappears when
  tabbed into, and does not hide at all under `prefers-reduced-motion`.

### Fixed

- Clicking a section link no longer adds a new browser-history entry, so the back
  button and edge swipe-back on mobile now leave the site in one step instead of
  stepping back through previously visited sections first.

### Changed

- New favicon and app icons: a circular portrait on the site's purple accent replaces
  the previous icon set, across the browser tab, bookmarks, the iOS home screen and
  the web manifest.
- Light mode moved off white and purple onto a warm stone palette: an off-white
  `#eeece7` page with alternating slightly deeper bands, `#f7f5f0` reading panels and a
  quieter `#76518f` plum for links, buttons and accents. No large surface is pure white
  any more, and the browser chrome on mobile picks up the page colour too. Dark mode is
  unchanged.
- The desktop Industry/Academia control is now a compact segmented control about 42px
  tall — a recessed track with the selected side filled — instead of two oversized
  buttons that stretched to the height of the section heading beside them.
- Selected things look the same everywhere now: the current nav item, the active
  Industry/Academia side and the selected company tab all use a pale plum fill with a
  dark plum label.
- Technology badges read as passive labels rather than controls — neutral stone chips
  with grey text, no purple outline and no hover effect, so they stop competing with the
  buttons and tabs around them.
- Toolbar controls line up: the menu button, theme toggle and Resume button share one
  height, one border weight and one icon size, and corner rounding follows a single
  scale across buttons, navigation and cards.
- The keyboard focus ring is now a solid plum outline with a thin gap, replacing a faint
  translucent halo that was hard to see against a reading panel and invisible on the
  plum primary button.
- Hover, press and selection feedback is quicker — roughly 140–200ms instead of
  240–360ms — so controls feel responsive rather than laggy.
- The soft purple glow behind the hero is gone, and the colour wash on the opening
  splash is about half as strong.
- Headings sit a consistent distance from the content below them, and on narrow screens
  nav rows, the Industry/Academia control and the company tabs are all at least 44px
  tall for touch.
- Hero portrait no longer sits in a cropped square card. The framing box (border,
  shadow, rounded corners) is gone and the full cutout image now blends straight
  into the section background.
- Footer credit line reworded from "Built by Ritam with Codex" to
  "Designed and developed by Ritam".
- Hero portrait swapped for a new photo.
- Header navigation items behave like buttons instead of underlined links: each is a
  pill that tints and lifts on hover and compresses on press, and the section you are
  in is marked by a filled pill rather than an accent underline. The Resume pill and
  theme toggle get the same feedback. Body and card links keep their wiping underline.
- Sections now ease into view over about a second instead of a quarter of one, rising
  further and cascading further apart, and the hero lines follow the same slower pace.
  Project and research cards keep a brisker 0.6s entrance so a grid of them does not
  drag. Hover and press feedback is a touch slower to match.
- The page no longer sits in a narrow centred column. Sections now span the full width
  of the window as alternating bands, and each section's heading sits in a left rail
  beside its content rather than stacked above it. Paragraph width is capped
  independently, so the wider layout does not stretch the text into long lines.
- "About Me" moved out of the About card and became the section's heading, matching the
  other sections and putting the title outside its container.
- Body copy — the About paragraphs, hero summary, project descriptions, experience
  bullets, contact text and patent titles — is no longer grey. It now uses a dedicated
  reading colour, with grey kept for metadata like dates, locations and group labels.
- Palette moved from neutral grays with a blue accent to a purple-black "Plum"
  scheme built on the official GNOME palette — `#1b1622` backgrounds and `#9141ac`
  purple in dark, `#faf8fb` and the same purple in light. GNOME's own dark tones are
  purple-tinted, so the accent now shares the background's warmth instead of fighting it.
- Tech Stack and project tags are legible again. The tags previously sat at a 1.13:1
  contrast ratio against the card behind them — effectively invisible — because the
  surface ramp was only an 8/255 step and the outline was too faint to carry an edge.
  Tags now use a purple-tinted fill, purple label text and a border measured at 3.2:1
  in both themes.
- Full visual redesign in a calm, GNOME/Adwaita-inspired style: the dark navy
  "space" theme (particle network hero, glowing radial backgrounds, green neon
  accent, monospace labels) is replaced with a flat light/dark palette (Adwaita
  blue accent, `#fafafb`/`#1e1e1e` backgrounds), a single Inter typeface, opaque
  reading-surface cards with hairline borders and soft shadows instead of
  glowing pill cards, and a frosted (blurred, translucent) sticky header. Button
  and card corner radii are more restrained (rounded rectangles instead of full
  pill shapes for primary actions), and interactive borders were tuned for
  contrast in light mode. Layout, content, and section structure are unchanged.
- Landing intro simplified: the animated dot-noise texture is gone and the
  intro background is now flat instead of a glowing gradient.

### Removed

- Hero particle network (`@tsparticles/react`, `@tsparticles/slim`) — dropped
  from the hero and from `package.json` as part of the visual redesign.

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
