# ProGuard rules for React Native app

# Keep React Native classes
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

# Keep Expo classes
-keep class expo.** { *; }
-keep class host.exp.exponent.** { *; }

# Keep networking classes
-keep class okhttp3.** { *; }
-keep class okio.** { *; }
-keep class retrofit2.** { *; }

# Keep AsyncStorage
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# Keep navigation
-keep class com.reactnavigation.** { *; }

# Keep vector icons
-keep class com.oblador.vectoricons.** { *; }

# Keep safe area context
-keep class com.th3rdwave.safeareacontext.** { *; }

# Keep screens
-keep class com.swmansion.rnscreens.** { *; }

# Keep datetime picker
-keep class com.reactcommunity.rndatetimepicker.** { *; }

# Generic keep rules
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Application
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.content.ContentProvider

# Preserve line numbers for stack traces
-keepattributes SourceFile,LineNumberTable

# Prevent obfuscation of React Native methods
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep resource files
-keepclassmembers class **.R$* {
    public static <fields>;
}