Pod::Spec.new do |s|
  s.name         = "react-native-layout-margins"
  s.version      = "0.1.0"
  s.summary      = "A simple react native module that allows to query `layoutMargins` of a current root view"
  s.homepage     = "https://github.com/dioncodes/react-native-layout-margins"
  s.license      = "MIT"
  s.author       = { "Dion Purushotham" => "hello@dion.codes" }

  s.platform     = :ios, "8.0"

  s.source       = { :git => "https://github.com/dioncodes/react-native-layout-margins.git", :tag => "v#{s.version}" }
  s.source_files  = "ios/**/*.{h,m}"
  s.preserve_paths  = "**/*.js"

  s.dependency 'React'
end
