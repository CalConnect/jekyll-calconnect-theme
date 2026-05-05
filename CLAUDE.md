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
- `_frontend/entrypoints/application.js` — imports `theme.js` (dark/light toggle with localStorage) and `navigation.js` (mobile menu, active state highlighting), plus sidebar collapsible toggle init
- `_sass/calconnect/` — supplementary SCSS for layout, navigation, typography, code blocks, tables, dark mode

### Sidebar navigation (default.html layout)

The sidebar is fully data-driven from `site.data.navigation_sidebar.sections`. Each section has a `match` string matched against `page.url`. Item types: `link`, `collection` (iterates a Jekyll collection), `collapsible` (expandable with URL filtering), `group` (labeled sub-group), `years` (year list from `site.data.news_years`). The layout has no hardcoded page knowledge — all configuration is in the consumer site's `_data/navigation_sidebar.yml`.

### Includes

- `head.html` — meta tags, Google Fonts (Inter + JetBrains Mono), critical inline CSS to prevent FOUC, `{% vite_stylesheet_tag %}`
- `custom-head.html` — Vite client + JS tag (for dev HMR in consumer sites)
- `header.html` — fixed top nav bar
- `footer.html` — copyright bar
- `breadcrumbs.html` — URL-derived breadcrumb trail
- `feedback.html` — "Was this helpful?" link
- `google-analytics.html` — conditional GA snippet (production only)

### Dark mode

Class-based (`html.dark`). `theme.js` runs immediately (before DOM ready) to prevent flash, using localStorage > system preference. Tailwind custom variant: `@custom-variant dark (&:where(.dark, .dark *))`.

### Ruby namespace

`Jekyll::CalconnectTheme` with version in `lib/jekyll/calconnect/theme/version.rb`. The gemspec requires the version constant from there.

### Gem packaging

`gemspec` packages: `{_layouts,_includes,_sass,_frontend,lib}/**/*`, `*.md`, `*.gemspec`. Only runtime dependency is `jekyll ~> 4.3`.

### Key Tailwind notes

Uses Tailwind v4 (CSS-first config with `@theme` blocks, not `tailwind.config.js`). Colors use `gray` not `slate` for class compatibility. Primary color scale is indigo-based; accent is cyan.
