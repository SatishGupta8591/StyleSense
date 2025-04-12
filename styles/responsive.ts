import { Dimensions, PixelRatio } from 'react-native';
import { responsive } from '@/styles/responsive';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions from design (assuming iPhone 11 Pro as base)
const baseWidth = 375;
const baseHeight = 812;

// Scale factors
const widthScale = SCREEN_WIDTH / baseWidth;
const heightScale = SCREEN_HEIGHT / baseHeight;

export const responsive = {
  width: (size: number) => PixelRatio.roundToNearestPixel(size * widthScale),
  height: (size: number) => PixelRatio.roundToNearestPixel(size * heightScale),
  font: (size: number) => PixelRatio.roundToNearestPixel(size * widthScale),
  
  // Standard spacing units
  spacing: {
    xs: PixelRatio.roundToNearestPixel(4 * widthScale),
    sm: PixelRatio.roundToNearestPixel(8 * widthScale),
    md: PixelRatio.roundToNearestPixel(16 * widthScale),
    lg: PixelRatio.roundToNearestPixel(24 * widthScale),
    xl: PixelRatio.roundToNearestPixel(32 * widthScale),
  },

  // Device size checks
  isSmallDevice: SCREEN_WIDTH < 375,
  isMediumDevice: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
  isLargeDevice: SCREEN_WIDTH >= 414,
  
  // Safe area helpers
  paddingHorizontal: PixelRatio.roundToNearestPixel(16 * widthScale),
  paddingVertical: PixelRatio.roundToNearestPixel(16 * heightScale),
};

// Example usage in styles
const styles = StyleSheet.create({
  container: {
    padding: responsive.spacing.md,
  },
  text: {
    fontSize: responsive.font(16),
  },
  image: {
    width: responsive.width(100),
    height: responsive.height(100),
  },
});