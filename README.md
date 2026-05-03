# calconnect-theme

Shared Jekyll theme gem for CalConnect sites (calconnect.org, DEVGUIDE, standards.calconnect.org).

## Usage

Add to your site's `Gemfile`:

```ruby
gem "calconnect-theme", git: "git@github.com:calconnect/calconnect-theme.git"
```

Add to your site's `_config.yml`:

```yaml
theme: calconnect-theme
```

## Site-specific overrides

Any layout or include can be overridden by placing a file with the same name in your site's own `_layouts/` or `_includes/` directory.
