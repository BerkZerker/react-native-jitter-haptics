import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  trigger(type: string): void;
  prepare(type: string): void;
  isSupported(): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('JitterHaptics');
