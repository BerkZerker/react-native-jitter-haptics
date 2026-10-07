# react-native-jitter-haptics

Unified semantic haptics for React Native — one API, best-in-class feedback on both iOS and Android.

Unlike other haptic libraries that treat Android as a second-class citizen, `react-native-jitter-haptics` maps each semantic haptic type to the **best available native API** on each platform, with graceful degradation on older devices.

## What makes this different?

| Feature | expo-haptics | react-native-haptic-feedback | **jitter-haptics** |
|---------|-------------|----------------------------|-----------------|
| Unified cross-platform API | Separate Android method | iOS-focused mapping | Single API, best per-platform |
| Modern Android (API 30+) | Via separate method | Via bridge | Native Turbo Module |
| Web | No-op | No | No-op |
| New Architecture | Expo Modules only | No | Turbo Module |
| No Expo dependency | No | Yes | Yes |
| Semantic types | Partial | Platform-specific | Intent-based |

## Platform mapping

| Semantic type | iOS | Android 14+ (API 34) | Android 11–13 (API 30–33) | Android 7–10 (API 24–29) |
|--------------|-----|----------------------|---------------------------|--------------------------|
| `tap` | Impact (Rigid) | `VIRTUAL_KEY` | `VIRTUAL_KEY` | `VIRTUAL_KEY` |
| `light` | Impact (Light) | `CONTEXT_CLICK` | `CONTEXT_CLICK` | `CONTEXT_CLICK` |
| `selection` | Selection | `SEGMENT_TICK` | `CONTEXT_CLICK` | `CONTEXT_CLICK` |
| `soft` | Impact (Soft) | `LOW_TICK` primitive* | `LOW_TICK` primitive* | `CONTEXT_CLICK` |
| `heavy` | Impact (Heavy) | `LONG_PRESS` | `LONG_PRESS` | `LONG_PRESS` |
| `success` | Notification (Success) | `CONFIRM` | `CONFIRM` | `VIRTUAL_KEY` |
| `warning` | Notification (Warning) | `TICK` → `CLICK` primitives* | `TICK` → `CLICK` primitives* | `LONG_PRESS` |
| `error` | Notification (Error) | `REJECT` | `REJECT` | `LONG_PRESS` |

\* Composition primitives play on Android 12+ (API 31) when the device's actuator supports them, and follow the system touch-feedback setting. Otherwise they fall back to `CONTEXT_CLICK` (`soft`) or `LONG_PRESS` (`warning`).

Everything else uses `View.performHapticFeedback`, so it respects the user's touch-feedback setting and uses each manufacturer's tuned effects. On web every call is a silent no-op, and on the iOS Simulator calls are skipped.

## Installation

```sh
npm install react-native-jitter-haptics
# or
yarn add react-native-jitter-haptics
```

For iOS, run pod install:

```sh
cd ios && pod install
```

> **Note:** This is a native module — it requires a dev build (not Expo Go).

## Usage

```tsx
import haptics from 'react-native-jitter-haptics';

// Semantic methods
haptics.tap();        // Button press
haptics.light();      // Low-stakes tap
haptics.selection();  // Picker/tab change
haptics.soft();       // Subtle feedback
haptics.heavy();      // Significant action
haptics.success();    // Task completed
haptics.warning();    // Caution
haptics.error();      // Failure

// Or use trigger() with a type string
haptics.trigger('success');

// Global enable/disable (e.g., from user settings)
haptics.setEnabled(false);
haptics.setEnabled(true);

// Warm up the Taptic Engine before an expected haptic (iOS; no-op elsewhere)
haptics.prepare('selection');

// Check for built-in haptic hardware (informational — triggers are always safe)
haptics.isSupported();
```

### Named imports

```tsx
import { tap, success, setEnabled } from 'react-native-jitter-haptics';

tap();
success();
setEnabled(false);
```

### With settings integration

```tsx
import haptics from 'react-native-jitter-haptics';
import { useEffect } from 'react';

function useHapticSettings(enabled: boolean) {
  useEffect(() => {
    haptics.setEnabled(enabled);
  }, [enabled]);
}
```

## API

| Method | Description |
|--------|-------------|
| `tap()` | Button presses, confirmable actions |
| `light()` | Low-stakes taps, secondary controls |
| `selection()` | Picker changes, tab switches, toggles |
| `soft()` | Scroll snaps, subtle value changes |
| `heavy()` | Drop actions, completing significant gestures |
| `success()` | Successful completions (purchase, save) |
| `warning()` | Cautionary feedback (nearing limits) |
| `error()` | Failures and invalid actions |
| `trigger(type)` | Trigger by type string |
| `prepare(type)` | Warm up the Taptic Engine ahead of an expected haptic (iOS only) |
| `isSupported()` | Whether the device has built-in haptic hardware. iPads report `false` even though Apple Pencil Pro and trackpads can play feedback, so don't use it to gate triggers |
| `setEnabled(bool)` | Global enable/disable |
| `isEnabled()` | Check if haptics are enabled |

## Requirements

- React Native 0.76+ (New Architecture / Turbo Modules)
- iOS 15.1+
- Android API 24+

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
