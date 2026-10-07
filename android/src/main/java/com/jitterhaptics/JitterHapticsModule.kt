package com.jitterhaptics

import android.os.Build
import android.view.HapticFeedbackConstants
import com.facebook.react.bridge.ReactApplicationContext

class JitterHapticsModule(reactContext: ReactApplicationContext) :
  NativeJitterHapticsSpec(reactContext) {

  override fun trigger(type: String) {
    val activity = currentActivity ?: return
    val view = activity.window?.decorView ?: return

    val constant = mapTypeToConstant(type)
    view.performHapticFeedback(constant)
  }

  override fun isSupported(): Boolean {
    // All Android devices with a vibrator support haptic feedback.
    // HapticFeedbackConstants are available since API 1, richer ones since API 30+.
    val vibrator = if (Build.VERSION.SDK_INT >= 31) {
      reactApplicationContext.getSystemService(android.os.VibratorManager::class.java)
        ?.defaultVibrator
    } else {
      @Suppress("DEPRECATION")
      reactApplicationContext.getSystemService(android.content.Context.VIBRATOR_SERVICE) as? android.os.Vibrator
    }
    return vibrator?.hasVibrator() == true
  }

  private fun mapTypeToConstant(type: String): Int {
    return when (type) {
      "tap" -> if (Build.VERSION.SDK_INT >= 23) {
        HapticFeedbackConstants.CONTEXT_CLICK
      } else {
        HapticFeedbackConstants.VIRTUAL_KEY
      }
      "selection" -> HapticFeedbackConstants.VIRTUAL_KEY
      "soft" -> if (Build.VERSION.SDK_INT >= 21) {
        HapticFeedbackConstants.CLOCK_TICK
      } else {
        HapticFeedbackConstants.KEYBOARD_TAP
      }
      "heavy" -> HapticFeedbackConstants.LONG_PRESS
      "success" -> if (Build.VERSION.SDK_INT >= 30) {
        HapticFeedbackConstants.CONFIRM
      } else if (Build.VERSION.SDK_INT >= 21) {
        HapticFeedbackConstants.CLOCK_TICK
      } else {
        HapticFeedbackConstants.KEYBOARD_TAP
      }
      "warning" -> if (Build.VERSION.SDK_INT >= 30) {
        HapticFeedbackConstants.GESTURE_END
      } else {
        HapticFeedbackConstants.LONG_PRESS
      }
      "error" -> if (Build.VERSION.SDK_INT >= 30) {
        HapticFeedbackConstants.REJECT
      } else {
        HapticFeedbackConstants.LONG_PRESS
      }
      else -> HapticFeedbackConstants.VIRTUAL_KEY
    }
  }

  companion object {
    const val NAME = NativeJitterHapticsSpec.NAME
  }
}
