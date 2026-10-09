# Changelog

Notable changes to the portfolio site. Newest first.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- The AdaptMATH project card now has an "Inside the engineering" button that expands a
  seven-slide walkthrough directly under the card: what the tutor is for, its system
  architecture, how each answer is routed, Bayesian mastery tracking, the curriculum and
  difficulty ladder, misconception diagnosis, and a bounded look at the synthetic-learner
  evaluation. It starts collapsed, shows one slide at a time with the next one peeking in,
  and can be moved with swipe or scroll, the arrow buttons, the labelled slide dots, or
  the arrow keys. Closing and reopening it keeps your place.
- The walkthrough's demos are hands-on and run entirely in the browser: pick a turn
  scenario to highlight its path through the routing graph, answer a mastery example
  correct, wrong or blank and watch the estimate and sustained-evidence gate move, select
  a skill to see its prerequisite and digit widths, and try the `42 − 17` answers to see
  the diagnosis. Test counts on the evaluation slide are labelled as results from the
  October 8, 2026 review, not live measurements.
- Each engineering slide of the AdaptMATH walkthrough now ends with a quiet "Skills
  demonstrated" footer, just above its source link: up to two skills (such as LangGraph,
  Bayesian inference or graph modeling), each with a one-line note on how it was applied
  in the work on that slide. The opening purpose slide is unchanged.

- The scientific question answering project card now has its own "Inside the engineering"
  walkthrough: five slides covering the research question (how much context is enough for a
  small language model), preparing QASPER into JSONL training examples, adapting
  Qwen2.5-0.5B with LoRA in two ways, a blind LLM-judged answer comparison, and what the
  comparison does and does not show. It uses the same deck as AdaptMATH: swipe, scroll,
  arrows, labelled dots and keyboard navigation, with the next slide peeking in.
- The walkthrough's demos run locally and call no model: step through answer selection,
  an example and its saved JSONL line, switch between the two training approaches, and
  reveal which model wrote answer A and which wrote answer B in a saved judged example.
  Counts are labelled as saved artifacts, and the closing next step is marked as proposed.
- The data preparation, LoRA, evaluation and findings slides end with the same quiet
  "Skills demonstrated" footer as AdaptMATH, with short source links to the repository.
- Added "Data preparation" (Data) and "Evaluation design" (LLM Systems & Agents) to the
  About Me tech stack.

- The bird classification project card now has its own "Inside the engineering"
  walkthrough: five slides covering the idea of recognizing birds by appearance and sound,
  how a call becomes a mel spectrogram, adapting a ResNet18 audio encoder to a one-channel
  input, joining the image and audio features before one classifier, and what the project
  does and does not establish. It uses the same deck as the other walkthroughs: swipe,
  scroll, arrows, labelled dots and keyboard navigation, with the next slide peeking in.
- The walkthrough's two demos run locally and call no model: switch the audio between a
  waveform, a mel spectrogram and the fixed-size model input, and trace the audio path
  through the two-branch architecture. The audio pictures are labelled as schematics, not
  recordings, and the 128-feature and 256-feature sizes are labelled as architecture
  dimensions rather than results.
- Every slide of the bird walkthrough ends with the same quiet "Skills demonstrated"
  footer as the other two. The closing slide states that performance is unverified and
  marks the proposed comparison as future work, not completed work.
- The Microsoft internship entry now has an "Explore my contribution" button that opens a
  six-slide walkthrough directly under it: making document Q&A easier to deploy, how
  RetrievalQA depends on its retriever, my MLflow retriever save/load proposal, moving
  credentials from JSON to environment variables, a preliminary callback handler, and an
  outcomes slide covering scope and future work. The entry starts compact, uses the same
  deck as the project walkthroughs (swipe, scroll, arrows, labelled dots, arrow keys, next
  slide peeking in), and keeps your place if you close and reopen it.
- The Microsoft walkthrough's demos run locally and call no model: trace a request from
  document lookup to answer generation, switch between the original gap and the save and
  load steps, compare JSON and environment-variable credentials, and inspect the query,
  documents and LLM output a callback prototype would print. Terminal output is labelled
  schematic.
- Each engineering slide of that walkthrough ends with up to two skills, each with a note on
  how I applied it, above short expandable "Project notes" with the public MLflow commit and
  draft pull request links. The notes state that the pull request is an unmerged draft and
  that testing, Studio UI resolution and performance results are not claimed.
- The Microsoft entry also shows a "My MLflow proposal (draft PR)" link beside the button.
  Its walkthrough has no "Scroll or swipe" hint or caveat line under the slide controls.

### Changed

- The Microsoft "Explore my contribution" walkthrough now opens attached to the bottom of the
  experience panel and runs the full width of the tabs and panel together, instead of being
  squeezed into the panel column. Open, the panel and walkthrough form one L-shaped card: one
  surface, no seam between them, and a curved inside corner where they meet.
- The Microsoft walkthrough's "Skills demonstrated" footers now sit a clear step below each
  slide's content instead of directly under it.
- Rewrote the Microsoft internship bullets to match the walkthrough: dropped the claims of
  "seamless" deployment, tracing, logging and memory management, and AzureML UI integration;
  the entry now lists the retriever save/load proposal (an unmerged MLflow draft), the
  environment-variable credential change, a preliminary callback handler, and the team's
  ChromaDB-to-AzureSearch feasibility testing.
- All walkthroughs: only the slide you are on can be tabbed into, so the keyboard no longer
  steps through the slides that are scrolled out of view. The position dots also respond to
  the arrow keys, Home and End, and keyboard focus moves to the current dot when the Previous
  or Next arrow reaches the end of the deck and switches off.
- All walkthroughs now resize more calmly: height and width changes are applied once per
  animation frame and ignored when nothing changed, which avoids resize loops.
- The scientific question answering walkthrough now sizes to the slide you are on instead of
  to its tallest slide, so the opening purpose slide no longer has a large blank area above
  its footer. The deck grows or shrinks (smoothly, unless reduced motion is on) as you
  navigate, resize the window, or switch a slide's demo. AdaptMATH's walkthrough is unchanged.
- The purpose slide gained a one-sentence motivation under its description: scientific
  questions can depend on details scattered across a paper, which makes useful answers hard
  for a small model.
- Retitled the NLP project card from "Comparing Small LLM QA Capabilities with Fine-Tuning
  vs Full Context" to "Small Models for Scientific Question Answering", and rewrote its
  description: both versions are LoRA-adapted, so the old wording was misleading.
- Renamed the "About" nav pill to "About Me".
- Restructured the About Me section into a single stacked column: bio, then a Tech
  Stack subsection with a collapsed preview of skills and a "View full tech stack"
  toggle (click, touch, or keyboard) that reveals every skill category, then a
  separated Education subsection with both degrees and Continuing Education
  (certificate link unchanged).
- Rewrote the About section bio to focus on end-to-end ownership of projects and
  what's currently being worked on (multi-agent LangGraph systems, medical imaging
  research at OSU), dropping the AdaptMATH project callout.
- The favicon and touch/app icons are now the circular portrait on a charcoal
  background instead of purple, transparent outside the circle.
- Installing the site as an app now labels it "Ritam" on the home screen instead of
  falling back to the truncated page title.
- Project cards now keep one column width however wide a card's contents are, so
  nothing inside a card can stretch the page sideways.

### Removed

- Dropped an unused duplicate set of the old purple icons that was still being
  deployed alongside the real ones.
- Removed the "Featured Project" label from project cards.

## 2026-09-28

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
