package com.jitterhaptics

import android.content.Context
import android.media.AudioAttributes
import android.os.Build
import android.os.VibrationAttributes
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.view.HapticFeedbackConstants
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.UiThreadUtil

class JitterHapticsModule(reactContext: ReactApplicationContext) :
  NativeJitterHapticsSpec(reactContext) {

  private val vibrator: Vibrator? by lazy {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      reactApplicationContext.getSystemService(VibratorManager::class.java)?.defaultVibrator
    } else {
      @Suppress("DEPRECATION")
      reactApplicationContext.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
    }
  }

  // Compositions fail silently when any primitive is unsupported, and
  // areAllPrimitivesSupported() is only reliable from API 31.
  private val softEffect: VibrationEffect? by lazy {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return@lazy null
    if (vibrator?.areAllPrimitivesSupported(
        VibrationEffect.Composition.PRIMITIVE_LOW_TICK
      ) != true
    ) {
      return@lazy null
    }
    VibrationEffect.startComposition()
      .addPrimitive(VibrationEffect.Composition.PRIMITIVE_LOW_TICK, 0.7f)
      .compose()
  }

  private val warningEffect: VibrationEffect? by lazy {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return@lazy null
    if (vibrator?.areAllPrimitivesSupported(
        VibrationEffect.Composition.PRIMITIVE_TICK,
        VibrationEffect.Composition.PRIMITIVE_CLICK
      ) != true
    ) {
      return@lazy null
    }
    VibrationEffect.startComposition()
      .addPrimitive(VibrationEffect.Composition.PRIMITIVE_TICK, 0.5f)
      .addPrimitive(VibrationEffect.Composition.PRIMITIVE_CLICK, 1.0f, 100)
      .compose()
  }

  override fun trigger(type: String) {
    val effect = when (type) {
      "soft" -> softEffect
      "warning" -> warningEffect
      else -> null
    }
    if (effect != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      vibrate(effect)
      return
    }

    // Views must be touched on the UI thread; TurboModule methods run on the
    // native modules thread.
    val constant = mapTypeToConstant(type)
    UiThreadUtil.runOnUiThread {
      reactApplicationContext.currentActivity?.window?.decorView?.performHapticFeedback(constant)
    }
  }

  override fun prepare(type: String) {
    // Android has no warm-up step for haptics.
  }

  override fun isSupported(): Boolean {
    return vibrator?.hasVibrator() == true
  }

  @RequiresApi(Build.VERSION_CODES.S)
  private fun vibrate(effect: VibrationEffect) {
    val vibrator = vibrator ?: return
    // Touch usage makes the effect follow the user's touch feedback setting.
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      vibrator.vibrate(effect, VibrationAttributes.createForUsage(VibrationAttributes.USAGE_TOUCH))
    } else {
      @Suppress("DEPRECATION")
      vibrator.vibrate(
        effect,
        AudioAttributes.Builder()
          .setUsage(AudioAttributes.USAGE_ASSISTANCE_SONIFICATION)
          .build()
      )
    }
  }

  private fun mapTypeToConstant(type: String): Int {
    return when (type) {
      "selection" -> if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
        HapticFeedbackConstants.SEGMENT_TICK
      } else {
        HapticFeedbackConstants.CONTEXT_CLICK
      }
      "light", "soft" -> HapticFeedbackConstants.CONTEXT_CLICK
      "heavy", "warning" -> HapticFeedbackConstants.LONG_PRESS
      "success" -> if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        HapticFeedbackConstants.CONFIRM
      } else {
        HapticFeedbackConstants.VIRTUAL_KEY
      }
      "error" -> if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
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
