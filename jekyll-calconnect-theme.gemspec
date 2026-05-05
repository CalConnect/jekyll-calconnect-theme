# frozen_string_literal: true

require_relative "lib/jekyll/calconnect/theme/version"

Gem::Specification.new do |spec|
  spec.name          = "jekyll-calconnect-theme"
  spec.version       = Jekyll::CalconnectTheme::VERSION
  spec.authors       = ["CalConnect"]
  spec.email         = ["info@calconnect.org"]
  spec.summary       = "Shared Jekyll theme for CalConnect sites"
  spec.homepage      = "https://github.com/calconnect/calconnect-theme"
  spec.license       = "MIT"

  spec.files = Dir[
    "{_layouts,_includes,_sass,_frontend,lib}/**/*",
    "*.md",
    "*.gemspec"
  ]

  spec.require_paths = ["lib"]

  spec.add_runtime_dependency "jekyll", "~> 4.3"
end
