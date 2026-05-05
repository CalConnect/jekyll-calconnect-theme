# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "calconnect-theme"
  spec.version       = "0.1.0"
  spec.authors       = ["CalConnect"]
  spec.email         = ["info@calconnect.org"]
  spec.summary       = "Shared Jekyll theme for CalConnect sites"
  spec.homepage      = "https://github.com/calconnect/calconnect-theme"
  spec.license       = "MIT"

  spec.files = Dir[
    "{_layouts,_includes,_sass,_frontend}/**/*",
    "*.md",
    "*.gemspec"
  ]

  spec.add_runtime_dependency "jekyll", "~> 4.3"
end
