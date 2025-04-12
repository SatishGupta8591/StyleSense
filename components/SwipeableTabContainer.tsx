import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const SWIPE_THRESHOLD = 50;
const { width } = Dimensions.get('window');

// Update TAB_ROUTES to use the correct route paths
const TAB_ROUTES = [
  { id: 'index', path: '/' },
  { id: 'wardrobe', path: '/wardrobe' },
  { id: 'add', path: '/add' },
  { id: 'style', path: '/style' },
  { id: 'profile', path: '/profile' }
];

interface SwipeableTabContainerProps {
  children: React.ReactNode;
  currentRoute: string;
}

export default function SwipeableTabContainer({ children, currentRoute }: SwipeableTabContainerProps) {
  const router = useRouter();
  const translateX = useSharedValue(0);

  const handleTabChange = (direction: 'left' | 'right') => {
    // Get current route index
    const currentIndex = TAB_ROUTES.findIndex(route => 
      currentRoute === route.path || currentRoute === `/${route.id}`
    );

    if (currentIndex === -1) return;

    // Prevent swiping left on home and right on profile
    if ((currentIndex === 0 && direction === 'right') || 
        (currentIndex === TAB_ROUTES.length - 1 && direction === 'left')) {
      return;
    }

    // Navigate to next/previous tab
    if (direction === 'right' && currentIndex > 0) {
      router.replace(TAB_ROUTES[currentIndex - 1].path);
    } else if (direction === 'left' && currentIndex < TAB_ROUTES.length - 1) {
      router.replace(TAB_ROUTES[currentIndex + 1].path);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      // Get current route index for gesture limits
      const currentIndex = TAB_ROUTES.findIndex(route => 
        currentRoute === route.path || currentRoute === `/${route.id}`
      );

      const maxSwipe = width * 0.15;
      let newTranslateX = ctx.startX + event.translationX;

      // Prevent swiping left on home and right on profile
      if ((currentIndex === 0 && newTranslateX > 0) || 
          (currentIndex === TAB_ROUTES.length - 1 && newTranslateX < 0)) {
        newTranslateX = 0;
      } else {
        newTranslateX = Math.max(Math.min(newTranslateX, maxSwipe), -maxSwipe);
      }

      translateX.value = newTranslateX;
    },
    onEnd: (event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        if (event.translationX > 0) {
          runOnJS(handleTabChange)('right');
        } else {
          runOnJS(handleTabChange)('left');
        }
      }
      translateX.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        activeOffsetX={[-10, 10]}
        failOffsetY={[-20, 20]}
      >
        <Animated.View style={[styles.content, animatedStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: width,
  },
});