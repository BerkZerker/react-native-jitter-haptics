# react-native-jitter-haptics

Unified semantic haptics for React Native — one API, best-in-class feedback on both iOS and Android.

Unlike other haptic libraries that treat Android as a second-class citizen, `react-native-jitter-haptics` maps each semantic haptic type to the **best available native API** on each platform, with graceful degradation on older devices.

## What makes this different?

| Feature | expo-haptics | react-native-haptic-feedback | **jitter-haptics** |
|---------|-------------|----------------------------|-----------------|
| Unified cross-platform API | Separate Android method | iOS-focused mapping | Single API, best per-platform |
| Modern Android (API 30+) | Via separate method | Via bridge | Native Turbo Module |
| New Architecture | Expo Modules only | No | Turbo Module |
| No Expo dependency | No | Yes | Yes |
| Semantic types | Partial | Platform-specific | Intent-based |

## Platform mapping

| Semantic type | iOS | Android (API 30+) | Android (older) |
|--------------|-----|-------------------|-----------------|
| `tap` | Impact (Rigid) | `CONTEXT_CLICK` | `VIRTUAL_KEY` |
| `selection` | Selection | `VIRTUAL_KEY` | `VIRTUAL_KEY` |
| `soft` | Impact (Soft) | `CLOCK_TICK` | `KEYBOARD_TAP` |
| `heavy` | Impact (Heavy) | `LONG_PRESS` | `LONG_PRESS` |
| `success` | Notification (Success) | `CONFIRM` | `CLOCK_TICK` |
| `warning` | Notification (Warning) | `GESTURE_END` | `LONG_PRESS` |
| `error` | Notification (Error) | `REJECT` | `LONG_PRESS` |

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

// Check device support
if (haptics.isSupported()) {
  haptics.tap();
}
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
| `selection()` | Picker changes, tab switches, toggles |
| `soft()` | Scroll snaps, subtle value changes |
| `heavy()` | Drop actions, completing significant gestures |
| `success()` | Successful completions (purchase, save) |
| `warning()` | Cautionary feedback (nearing limits) |
| `error()` | Failures and invalid actions |
| `trigger(type)` | Trigger by type string |
| `isSupported()` | Check if device supports haptics |
| `setEnabled(bool)` | Global enable/disable |
| `isEnabled()` | Check if haptics are enabled |

## Requirements

- React Native 0.76+ (New Architecture / Turbo Modules)
- iOS 13+
- Android API 24+

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
