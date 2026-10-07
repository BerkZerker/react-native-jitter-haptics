import JitterHaptics from '../module.web';

describe('web module', () => {
  it('no-ops every call without touching native code', () => {
    expect(() => JitterHaptics.trigger('tap')).not.toThrow();
    expect(() => JitterHaptics.prepare('tap')).not.toThrow();
  });

  it('reports haptics as unsupported', () => {
    expect(JitterHaptics.isSupported()).toBe(false);
  });
});
