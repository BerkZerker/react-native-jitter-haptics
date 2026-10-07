# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-03-24

### Added

- Initial release
- Semantic haptic API: `tap`, `selection`, `soft`, `heavy`, `success`, `warning`, `error`
- `trigger(type)` for dynamic haptic type selection
- `isSupported()` to check device haptic capability
- `setEnabled(bool)` / `isEnabled()` for global enable/disable
- iOS implementation using CoreHaptics (UIImpactFeedbackGenerator, UISelectionFeedbackGenerator, UINotificationFeedbackGenerator)
- Android implementation with API 30+ HapticFeedbackConstants and graceful fallback for older devices
- React Native New Architecture support (Turbo Modules)
- Example app with all haptic types

[0.1.0]: https://github.com/BerkZerker/react-native-jitter-haptics/releases/tag/v0.1.0
