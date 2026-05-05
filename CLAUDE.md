# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a shared Jekyll theme gem (`jekyll-calconnect-theme`) used across multiple CalConnect sites (calconnect.org, DEVGUIDE, standards.calconnect.org). Sites consume it via their Gemfile and override layouts/includes as needed.

## Build & Development

```bash
# Install dependencies
bundle install

# Build the gem
rake build                  # outputs to pkg/

# Install locally for development
rake install
```

This is a theme gem only — there is no standalone site to serve. To preview changes, use the theme in a consumer site's `_config.yml` with a Gemfile pointing at the local path.

## Architecture

### Layout hierarchy

```
base.html        → HTML shell: head, header, footer, Vite JS entry
  └─ default.html → Documentation layout: sidebar nav + article area
       └─ page.html → Pass-through wrapper
```

### Frontend pipeline

CSS and JS live under `_frontend/` and are built by [jekyll-vite](https://github.com/elixir-vite/vite_ruby) in the consumer site. The theme provides:
- `_frontend/entrypoints/application.css` — Tailwind v4 config (`@import "tailwindcss"`), `@tailwindcss/typography` plugin, custom theme tokens (primary/accent colors, fonts)
- `_frontend/entrypoints/application.js` — imports `theme.js` (dark/light toggle with localStorage) and `navigation.js` (mobile menu, sidebar drawer, active state highlighting), plus sidebar collapsible toggle init
- `_sass/calconnect/` — supplementary SCSS for layout, navigation, typography, code blocks, tables, dark mode. All colors use `var(--color-*, fallback)` referencing Tailwind's CSS custom properties — single source of truth for the palette.

### Sidebar navigation

The sidebar is fully data-driven from `site.data.navigation_sidebar.sections`. Each section has a `match` string matched against `page.url`. The rendering is split across two includes:
- `sidebar-nav.html` — finds the matching section, iterates its items
- `sidebar-nav-item.html` — renders a single item by type. Group items recursively include this for their children, eliminating duplication.

Item types: `link`, `collection` (iterates a Jekyll collection), `collapsible` (expandable with URL filtering), `group` (labeled sub-group with children), `years` (year list from `site.data.news_years`).

### Icon system

Icons live in `_includes/icons/` as `.svg` files (Liquid templates that output `<svg>` markup). Each accepts an optional `class` parameter for sizing (`{{ include.class | default: 'w-5 h-5' }}`). Consumer sites override individual icons by dropping a same-named file in their own `_includes/icons/`.

### Site configuration (_config.yml)

- `site.logo` / `site.logo_dark` — header/footer logo paths (dark variant for dark mode)
- `site.header_cta` — `{url, label}` for a CTA button in the header
- `site.data.navigation_header` — list of `{label, url, external?}` items for header nav
- `site.data.navigation_footer` — list of `{title, links: [{label, url}]}` columns for footer
- `site.data.social_links` — list of `{platform, url}` for footer social icons (github, linkedin, twitter/x, youtube)
- `site.google_analytics` — GA4 measurement ID (production only)
- Favicon files at site root: `favicon.svg`, `favicon-96x96.png`, `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest`

### Includes

- `head.html` — meta tags, full favicon set, Google Fonts (Inter + JetBrains Mono), critical inline CSS to prevent FOUC, `{% vite_stylesheet_tag %}`, GA4 (production only)
- `custom-head.html` — Vite client tag (for dev HMR in consumer sites)
- `header.html` — fixed top nav with logo, desktop nav, dark mode toggle, CTA button, mobile hamburger (sidebar drawer on docs pages, dropdown on others)
- `footer.html` — logo + description column, data-driven nav columns, social links, copyright
- `sidebar-nav.html` + `sidebar-nav-item.html` — data-driven sidebar navigation
- `breadcrumbs.html` — URL-derived breadcrumb trail
- `feedback.html` — "Was this helpful?" link
- `google-analytics.html` — GA4 gtag.js snippet
- `icons/*.svg` — parametric icon includes (class parameter for sizing)

### Dark mode

Class-based (`html.dark`). `theme.js` runs immediately (before DOM ready) to prevent flash, using localStorage > system preference. Tailwind custom variant: `@custom-variant dark (&:where(.dark, .dark *))`.

### Ruby namespace

`Jekyll::CalconnectTheme` with version in `lib/jekyll/calconnect/theme/version.rb`. The gemspec requires the version constant from there.

### Gem packaging

`gemspec` packages: `{_layouts,_includes,_sass,_frontend,lib}/**/*`, `*.md`, `*.gemspec`. Only runtime dependency is `jekyll ~> 4.3`.

### Key Tailwind notes

Uses Tailwind v4 (CSS-first config with `@theme` blocks, not `tailwind.config.js`). Colors use `gray` not `slate` for class compatibility. Primary color scale is indigo-based; accent is cyan. SCSS files reference colors via `var(--color-*, fallback)` to stay in sync with the Tailwind theme.
