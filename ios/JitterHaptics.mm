#import "JitterHaptics.h"
#import <UIKit/UIKit.h>
#import <CoreHaptics/CoreHaptics.h>

@implementation JitterHaptics

- (void)trigger:(NSString *)type {
  dispatch_async(dispatch_get_main_queue(), ^{
    if ([type isEqualToString:@"tap"]) {
      UIImpactFeedbackGenerator *generator = [[UIImpactFeedbackGenerator alloc] initWithStyle:UIImpactFeedbackStyleRigid];
      [generator prepare];
      [generator impactOccurred];
    } else if ([type isEqualToString:@"selection"]) {
      UISelectionFeedbackGenerator *generator = [[UISelectionFeedbackGenerator alloc] init];
      [generator prepare];
      [generator selectionChanged];
    } else if ([type isEqualToString:@"soft"]) {
      UIImpactFeedbackGenerator *generator = [[UIImpactFeedbackGenerator alloc] initWithStyle:UIImpactFeedbackStyleSoft];
      [generator prepare];
      [generator impactOccurred];
    } else if ([type isEqualToString:@"heavy"]) {
      UIImpactFeedbackGenerator *generator = [[UIImpactFeedbackGenerator alloc] initWithStyle:UIImpactFeedbackStyleHeavy];
      [generator prepare];
      [generator impactOccurred];
    } else if ([type isEqualToString:@"success"]) {
      UINotificationFeedbackGenerator *generator = [[UINotificationFeedbackGenerator alloc] init];
      [generator prepare];
      [generator notificationOccurred:UINotificationFeedbackTypeSuccess];
    } else if ([type isEqualToString:@"warning"]) {
      UINotificationFeedbackGenerator *generator = [[UINotificationFeedbackGenerator alloc] init];
      [generator prepare];
      [generator notificationOccurred:UINotificationFeedbackTypeWarning];
    } else if ([type isEqualToString:@"error"]) {
      UINotificationFeedbackGenerator *generator = [[UINotificationFeedbackGenerator alloc] init];
      [generator prepare];
      [generator notificationOccurred:UINotificationFeedbackTypeError];
    } else {
      // Fallback: treat unknown types as a tap
      UIImpactFeedbackGenerator *generator = [[UIImpactFeedbackGenerator alloc] initWithStyle:UIImpactFeedbackStyleMedium];
      [generator prepare];
      [generator impactOccurred];
    }
  });
}

- (NSNumber *)isSupported {
  return @([CHHapticEngine capabilitiesForHardware].supportsHaptics);
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
