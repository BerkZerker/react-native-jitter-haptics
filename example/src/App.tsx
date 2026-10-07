import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import haptics, {
  isSupported,
  setEnabled,
  isEnabled,
  type HapticType,
} from 'react-native-jitter-haptics';

const HAPTIC_TYPES: { type: HapticType; label: string; description: string }[] =
  [
    {
      type: 'tap',
      label: 'Tap',
      description: 'Button presses, confirmable actions',
    },
    {
      type: 'selection',
      label: 'Selection',
      description: 'Picker changes, tab switches',
    },
    {
      type: 'soft',
      label: 'Soft',
      description: 'Scroll snaps, subtle value changes',
    },
    {
      type: 'heavy',
      label: 'Heavy',
      description: 'Drop actions, significant gestures',
    },
    {
      type: 'success',
      label: 'Success',
      description: 'Successful completions',
    },
    { type: 'warning', label: 'Warning', description: 'Cautionary feedback' },
    {
      type: 'error',
      label: 'Error',
      description: 'Failures and invalid actions',
    },
  ];

export default function App() {
  const supported = isSupported();
  const [enabled, setEnabledState] = useState(isEnabled());

  const toggleEnabled = (value: boolean) => {
    setEnabled(value);
    setEnabledState(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>JitterHaptics</Text>
        <Text style={styles.subtitle}>
          Haptics supported: {supported ? 'Yes' : 'No'}
        </Text>

        <View style={styles.toggle}>
          <Text style={styles.toggleLabel}>Haptics enabled</Text>
          <Switch
            value={enabled}
            onValueChange={toggleEnabled}
            trackColor={{ false: '#333', true: '#4a4a4a' }}
            thumbColor={enabled ? '#fff' : '#888'}
          />
        </View>

        <View style={styles.grid}>
          {HAPTIC_TYPES.map(({ type, label, description }) => (
            <Pressable
              key={type}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => haptics.trigger(type)}
            >
              <Text style={styles.buttonLabel}>{label}</Text>
              <Text style={styles.buttonDescription}>{description}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 32,
  },
  grid: {
    gap: 12,
  },
  button: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  buttonPressed: {
    backgroundColor: '#2a2a2a',
    borderColor: '#3a3a3a',
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  buttonDescription: {
    fontSize: 13,
    color: '#777',
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 12,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
