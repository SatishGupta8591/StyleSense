import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, useColorScheme } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const THEME_COLORS = {
  light: {
    primary: '#FF4C94',
    secondary: '#FFE0F0',
    accent: '#FFC0CB',
    background: '#FFFFFF',
    pattern: '#FFB6C1',
    overlay: 'rgba(255, 255, 255, 0.92)',
  },
  dark: {
    primary: '#FF1493',
    secondary: '#4A0028',
    accent: '#800040',
    background: '#1A1A1A',
    pattern: '#330019',
    overlay: 'rgba(26, 26, 26, 0.92)',
  },
};

export default function AnimatedBackground() {
  const colorScheme = useColorScheme();
  const colors = THEME_COLORS[colorScheme ?? 'light'];
  
  const rotate1 = useSharedValue(0);
  const rotate2 = useSharedValue(0);
  const rotate3 = useSharedValue(0);
  const translateY1 = useSharedValue(0);
  const translateY2 = useSharedValue(0);
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const colorProgress = useSharedValue(0);

  useEffect(() => {
    // Enhanced rotation animations
    rotate1.value = withRepeat(
      withTiming(360, {
        duration: 25000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    rotate2.value = withRepeat(
      withTiming(-360, {
        duration: 30000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    rotate3.value = withRepeat(
      withTiming(360, {
        duration: 35000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    // Subtle floating animations
    translateY1.value = withRepeat(
      withSequence(
        withTiming(15, {
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(-15, {
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1,
      true
    );

    // Color transition animation
    colorProgress.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: 8000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0, {
          duration: 8000,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1,
      true
    );
  }, []);

  const patternStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate3.value}deg` }],
    opacity: 0.05,
  }));

  const blob1Style = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotate1.value}deg` },
      { translateY: translateY1.value },
      { scale: scale1.value },
    ],
    backgroundColor: interpolateColor(
      colorProgress.value,
      [0, 1],
      [colors.secondary, colors.accent]
    ),
  }));

  const blob2Style = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotate2.value}deg` },
      { translateY: translateY2.value },
      { scale: scale2.value },
    ],
    backgroundColor: interpolateColor(
      colorProgress.value,
      [0, 1],
      [colors.primary, colors.secondary]
    ),
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Fashion pattern background */}
      <Animated.View style={[styles.pattern, patternStyle]}>
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.patternElement,
              {
                backgroundColor: colors.pattern,
                left: (i % 4) * width * 0.25,
                top: Math.floor(i / 4) * width * 0.25,
              },
            ]}
          />
        ))}
      </Animated.View>

      {/* Animated blobs */}
      <Animated.View style={[styles.blob1, blob1Style]} />
      <Animated.View style={[styles.blob2, blob2Style]} />

      {/* Content overlay */}
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  pattern: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  patternElement: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
  },
  blob1: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width,
    top: -width * 0.4,
    left: -width * 0.25,
    opacity: 0.4,
  },
  blob2: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width,
    bottom: -width * 0.3,
    right: -width * 0.2,
    opacity: 0.3,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backdropFilter: 'blur(8px)',
  },
});