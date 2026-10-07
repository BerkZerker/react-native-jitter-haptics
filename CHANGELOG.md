# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-10-07

### Changed

- Renamed from `react-native-feelback` to `react-native-jitter-haptics`. The native module is now `JitterHaptics` (Android package `com.jitterhaptics`)
- Android: remapped haptic types to match iOS more closely. `selection` is now a tick (`SEGMENT_TICK` on API 34+), `tap` a full click, `success` a click instead of a possibly silent texture tick below API 30, and `warning` is no longer weaker than `success`
- Android: `soft` and `warning` use vibration composition primitives on API 31+ when supported, so every type feels distinct
- Android: haptics now fire on the UI thread, and the library declares the `VIBRATE` permission
- iOS: feedback generators are reused instead of allocated per call, and `isSupported()` is cached
- `isSupported()` is documented as informational: iPads report `false` but can still play Apple Pencil Pro / trackpad feedback
- Android build config updated to the current create-react-native-library template (Java 17)

### Added

- `light()` / `trigger('light')` — light impact
- `prepare(type)` — warm up the Taptic Engine ahead of an expected haptic (iOS; no-op elsewhere)
- Web support: every call is a silent no-op, so the package can be imported from React Native Web
- Calls are skipped on the iOS Simulator

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

[1.0.0]: https://github.com/BerkZerker/react-native-jitter-haptics/releases/tag/v1.0.0
[0.1.0]: https://github.com/BerkZerker/react-native-jitter-haptics/releases/tag/v0.1.0
