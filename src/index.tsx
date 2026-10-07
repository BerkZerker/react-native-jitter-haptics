import JitterHaptics from './NativeJitterHaptics';

export type HapticType =
  | 'tap'
  | 'selection'
  | 'soft'
  | 'heavy'
  | 'success'
  | 'warning'
  | 'error';

let _enabled = true;

/**
 * Trigger a haptic by semantic type.
 * Automatically maps to the best available haptic on each platform.
 */
export function trigger(type: HapticType): void {
  if (!_enabled) return;
  JitterHaptics.trigger(type);
}

/** Tap feedback — use for button presses and confirmable actions. */
export function tap(): void {
  trigger('tap');
}

/** Selection feedback — use for picker changes, tab switches, toggles. */
export function selection(): void {
  trigger('selection');
}

/** Soft impact — use for subtle feedback like scroll snaps or value changes. */
export function soft(): void {
  trigger('soft');
}

/** Heavy impact — use for significant actions like dropping an item or completing a gesture. */
export function heavy(): void {
  trigger('heavy');
}

/** Success notification — use for successful completions (purchase, save, etc). */
export function success(): void {
  trigger('success');
}

/** Warning notification — use for cautionary feedback (nearing a limit, destructive action preview). */
export function warning(): void {
  trigger('warning');
}

/** Error notification — use for failures and invalid actions. */
export function error(): void {
  trigger('error');
}

/** Check if the device supports haptic feedback. */
export function isSupported(): boolean {
  return JitterHaptics.isSupported();
}

/** Enable or disable all haptic feedback globally. */
export function setEnabled(enabled: boolean): void {
  _enabled = enabled;
}

/** Check if haptic feedback is currently enabled. */
export function isEnabled(): boolean {
  return _enabled;
}

const haptics = {
  trigger,
  tap,
  selection,
  soft,
  heavy,
  success,
  warning,
  error,
  isSupported,
  setEnabled,
  isEnabled,
};

export default haptics;
