import type { Spec } from './NativeJitterHaptics';

// The web has no haptics API worth targeting; every call is a silent no-op so
// the package can be imported from React Native Web.
const JitterHaptics: Pick<Spec, 'trigger' | 'prepare' | 'isSupported'> = {
  trigger() {},
  prepare() {},
  isSupported: () => false,
};

export default JitterHaptics;
