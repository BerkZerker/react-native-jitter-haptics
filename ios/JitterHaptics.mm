#import "JitterHaptics.h"
#import <UIKit/UIKit.h>
#import <CoreHaptics/CoreHaptics.h>
#import <TargetConditionals.h>

// Generators are created lazily and reused: allocating one per call wastes
// work, and a retained generator is what lets prepare() actually cut latency.
// All generator access happens on the main queue.
@implementation JitterHaptics {
  NSMutableDictionary<NSString *, UIFeedbackGenerator *> *_generators;
}

- (UIFeedbackGenerator *)generatorForType:(NSString *)type {
  if (!_generators) {
    _generators = [NSMutableDictionary new];
  }

  UIFeedbackGenerator *generator = _generators[type];
  if (generator) {
    return generator;
  }

  if ([type isEqualToString:@"selection"]) {
    generator = [UISelectionFeedbackGenerator new];
  } else if ([type isEqualToString:@"success"] ||
             [type isEqualToString:@"warning"] ||
             [type isEqualToString:@"error"]) {
    // One notification generator serves all three notification types.
    generator = _generators[@"notification"];
    if (!generator) {
      generator = [UINotificationFeedbackGenerator new];
      _generators[@"notification"] = generator;
    }
  } else {
    UIImpactFeedbackStyle style = UIImpactFeedbackStyleMedium;
    if ([type isEqualToString:@"tap"]) {
      style = UIImpactFeedbackStyleRigid;
    } else if ([type isEqualToString:@"light"]) {
      style = UIImpactFeedbackStyleLight;
    } else if ([type isEqualToString:@"soft"]) {
      style = UIImpactFeedbackStyleSoft;
    } else if ([type isEqualToString:@"heavy"]) {
      style = UIImpactFeedbackStyleHeavy;
    }
    generator = [[UIImpactFeedbackGenerator alloc] initWithStyle:style];
  }

  _generators[type] = generator;
  return generator;
}

- (void)trigger:(NSString *)type {
#if !TARGET_OS_SIMULATOR
  dispatch_async(dispatch_get_main_queue(), ^{
    UIFeedbackGenerator *generator = [self generatorForType:type];

    if ([generator isKindOfClass:[UISelectionFeedbackGenerator class]]) {
      [(UISelectionFeedbackGenerator *)generator selectionChanged];
    } else if ([generator isKindOfClass:[UINotificationFeedbackGenerator class]]) {
      UINotificationFeedbackType feedbackType = UINotificationFeedbackTypeSuccess;
      if ([type isEqualToString:@"warning"]) {
        feedbackType = UINotificationFeedbackTypeWarning;
      } else if ([type isEqualToString:@"error"]) {
        feedbackType = UINotificationFeedbackTypeError;
      }
      [(UINotificationFeedbackGenerator *)generator notificationOccurred:feedbackType];
    } else {
      [(UIImpactFeedbackGenerator *)generator impactOccurred];
    }
  });
#endif
}

- (void)prepare:(NSString *)type {
#if !TARGET_OS_SIMULATOR
  dispatch_async(dispatch_get_main_queue(), ^{
    [[self generatorForType:type] prepare];
  });
#endif
}

- (NSNumber *)isSupported {
  static BOOL supported;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    supported = [CHHapticEngine capabilitiesForHardware].supportsHaptics;
  });
  return @(supported);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeJitterHapticsSpecJSI>(params);
}

+ (NSString *)moduleName
{
  return @"JitterHaptics";
}

@end
