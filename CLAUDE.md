# CLAUDE.md

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # production build -> dist/
npm run preview  # serve the built dist/
```

No tests, no linter, no typecheck. Verification is `npm run build` plus loading the
page in the dev server.

## Changelog

`CHANGELOG.md` at the repo root is maintained by hand and must stay current.

- **Every change that affects the site gets an entry** — new or reworked sections,
  content updates in `portfolioData.js`, styling and layout changes, dependency
  changes, deploy config. Add it in the same change as the code, not afterwards.
- New entries go under `## [Unreleased]`, grouped by `### Added` / `### Changed` /
  `### Fixed` / `### Removed`. Create the heading if it isn't there.
- One line per change, written for a reader rather than as a commit subject:
  say what changed on the site, not which file was touched.
- Skip entries only for things with no effect on the built site — a typo in a
  comment, a reformat. When in doubt, add the line.

## Architecture

Vite + React 18 single-page app. One page, no router — navigation is `#hash` anchors
to `<section className="section" id="...">`. `src/App.jsx` composes every section and
passes data down as props; the components under `src/components/` are presentational.

**All content lives in `src/data/portfolioData.js`** — `profile`, `techStack`,
`education`, `experienceItems`, `projectItems`, `researchItems`, `courseItems`,
`patentItems`. Copy, links and list items are edited there, never hardcoded into JSX.

`projectItems` and `researchItems` share one shape, rendered by
`src/components/ProjectCard.jsx` for both sections — edit the card once, not per
section. Each entry carries `links: [{ label, href }]`, a list rather than a single
URL, so a card can point at a repo and a demo at the same time. `courseItems` and
`patentItems` render inside `AboutSection`, not in sections of their own.

### Adding a section

1. Export the data from `src/data/portfolioData.js`.
2. Add a component in `src/components/` returning `<section className="section" id="x">`.
3. Render it inside `<main>` in `src/App.jsx`.
4. Add `{ href: '#x', label: '...' }` to `navItems` at the top of
   `src/components/Header.jsx` — easiest step to forget. The nav is deliberately
   short (About, Experience, Projects, Research, Contact); smaller content belongs
   inside an existing section, the way courses and patents sit in About.
5. Style it in `src/styles.css`.

## Styling

Single global `src/styles.css` (~1500 lines). No CSS modules, no Tailwind.

- **`1rem = 10px`** — `html { font-size: 62.5% }`. Sizes written against the usual
  16px base come out far too small.
- The palette is CSS custom properties on `:root`, overridden under
  `:root[data-theme='dark']`. Use `var(--brand)`, `var(--surface)`, `var(--muted)`,
  `var(--text)`, `var(--line)` — literal colors break dark mode.

## Theme

`App.jsx` sets `data-theme` on `document.documentElement` and persists it under the
localStorage key `portfolio-theme`, falling back to `prefers-color-scheme`.

## Navigation and scrolling

Two things keep `#hash` navigation from breaking, both easy to undo by accident:

- `.section` carries `scroll-margin-top: 9rem` so anchor targets clear the fixed
  header. A new section gets this for free by using `className="section"`.
- **Nothing full-height may keep a `filter` once its animation ends** — not even
  `filter: blur(0)`, which still promotes the element to its own composited layer.
  On `<main>` that is the entire page, and a smooth-scroll jump repaints it blank
  for a second or two. `App.jsx` adds a `revealed` class once the intro reveal has
  settled, and `.app-shell.revealed` clears `filter`/`transform`/`transition`.
  Animate the blur in if you like, but always land on `filter: none`.

## Motion

Animated work (scroll-reveal on sections/cards, the header auto-hide, the theme-toggle
wipe, `LandingIntro`) is gated on `prefers-reduced-motion`,
and `src/styles.css` ends with a `@media (prefers-reduced-motion: reduce)` block. New
animation follows the same gate. The intro also locks scrolling via
`body.intro-active`, which is why `getInitialIntroState()` skips it for deep links.

## Assets

Files live in `public/assets/**` and are referenced by absolute path (`/assets/...`).
Spaces must be `%20`-encoded in the data file, and the certificates directory really
is spelled `Certifcates` — correcting either silently 404s the links.

## Icons

Font Awesome 6 via a CDN `<link>` in `index.html`, used as
`<i className="fa-solid fa-..." aria-hidden="true" />`. No icon package is installed.

## Deploy

Netlify per `netlify.toml`: `npm run build` publishing `dist/`, with a catch-all
rewrite to `/index.html`. `dist/` is gitignored and stays untracked.
