import haptics, {
  tap,
  light,
  selection,
  soft,
  heavy,
  success,
  warning,
  error,
  trigger,
  prepare,
  isSupported,
  setEnabled,
  isEnabled,
} from '../index';

// Mock the native module
const mockTrigger = jest.fn();
const mockPrepare = jest.fn();
const mockIsSupported = jest.fn(() => true);

jest.mock('../module', () => ({
  __esModule: true,
  default: {
    trigger: (...args: unknown[]) => mockTrigger(...args),
    prepare: (...args: unknown[]) => mockPrepare(...args),
    isSupported: () => mockIsSupported(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
  setEnabled(true);
});

describe('trigger()', () => {
  it('calls native trigger with the type', () => {
    trigger('tap');
    expect(mockTrigger).toHaveBeenCalledWith('tap');
  });

  it('does not call native when disabled', () => {
    setEnabled(false);
    trigger('tap');
    expect(mockTrigger).not.toHaveBeenCalled();
  });
});

describe('semantic methods', () => {
  const methods = [
    { fn: tap, type: 'tap' },
    { fn: light, type: 'light' },
    { fn: selection, type: 'selection' },
    { fn: soft, type: 'soft' },
    { fn: heavy, type: 'heavy' },
    { fn: success, type: 'success' },
    { fn: warning, type: 'warning' },
    { fn: error, type: 'error' },
  ] as const;

  it.each(methods)('$type calls native trigger', ({ fn, type }) => {
    fn();
    expect(mockTrigger).toHaveBeenCalledWith(type);
  });

  it.each(methods)('$type does not call native when disabled', ({ fn }) => {
    setEnabled(false);
    fn();
    expect(mockTrigger).not.toHaveBeenCalled();
  });
});

describe('prepare()', () => {
  it('calls native prepare with the type', () => {
    prepare('selection');
    expect(mockPrepare).toHaveBeenCalledWith('selection');
  });

  it('does not call native when disabled', () => {
    setEnabled(false);
    prepare('selection');
    expect(mockPrepare).not.toHaveBeenCalled();
  });
});

describe('isSupported()', () => {
  it('returns the native value', () => {
    expect(isSupported()).toBe(true);
  });

  it('returns false when native says false', () => {
    mockIsSupported.mockReturnValueOnce(false);
    expect(isSupported()).toBe(false);
  });
});

describe('setEnabled / isEnabled', () => {
  it('defaults to enabled', () => {
    expect(isEnabled()).toBe(true);
  });

  it('can be disabled and re-enabled', () => {
    setEnabled(false);
    expect(isEnabled()).toBe(false);
    setEnabled(true);
    expect(isEnabled()).toBe(true);
  });

  it('triggers haptics again after re-enabling', () => {
    setEnabled(false);
    trigger('tap');
    expect(mockTrigger).not.toHaveBeenCalled();

    setEnabled(true);
    trigger('tap');
    expect(mockTrigger).toHaveBeenCalledWith('tap');
  });
});

describe('default export', () => {
  it('exposes all methods', () => {
    expect(haptics.tap).toBe(tap);
    expect(haptics.light).toBe(light);
    expect(haptics.selection).toBe(selection);
    expect(haptics.soft).toBe(soft);
    expect(haptics.heavy).toBe(heavy);
    expect(haptics.success).toBe(success);
    expect(haptics.warning).toBe(warning);
    expect(haptics.error).toBe(error);
    expect(haptics.trigger).toBe(trigger);
    expect(haptics.prepare).toBe(prepare);
    expect(haptics.isSupported).toBe(isSupported);
    expect(haptics.setEnabled).toBe(setEnabled);
    expect(haptics.isEnabled).toBe(isEnabled);
  });
});
