import { Dimensions, Platform, PixelRatio } from 'react-native';

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive scale functions
const scale = SCREEN_WIDTH / 375; // iPhone X width as base
const verticalScale = SCREEN_HEIGHT / 667; // iPhone X height as base

// Scale functions for different elements
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
export const scaleSize = (size) => Math.round(scale * size);
export const scaleVertical = (size) => Math.round(verticalScale * size);

// Font scaling
export const scaleFont = (size) => {
  const newSize = scale * size;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

// Device type detection
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = SCREEN_WIDTH >= 414;

// Screen size categories
export const isTablet = SCREEN_WIDTH >= 768;
export const isPhone = SCREEN_WIDTH < 768;

// Orientation detection
export const isPortrait = SCREEN_HEIGHT > SCREEN_WIDTH;
export const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;

// Safe area insets
export const getStatusBarHeight = () => {
  if (Platform.OS === 'android') {
    return 24; // Standard Android status bar height
  }
  return 0; // iOS handles this differently
};

// Responsive padding/margin helpers
export const responsivePadding = (basePadding) => {
  if (isSmallDevice) return scaleSize(basePadding * 0.8);
  if (isLargeDevice) return scaleSize(basePadding * 1.2);
  return scaleSize(basePadding);
};

export const responsiveMargin = (baseMargin) => {
  if (isSmallDevice) return scaleSize(baseMargin * 0.8);
  if (isLargeDevice) return scaleSize(baseMargin * 1.2);
  return scaleSize(baseMargin);
};

// Responsive width/height helpers
export const responsiveWidth = (percentage) => {
  return SCREEN_WIDTH * (percentage / 100);
};

export const responsiveHeight = (percentage) => {
  return SCREEN_HEIGHT * (percentage / 100);
};

// Grid system for responsive layouts
export const getGridColumns = () => {
  if (isTablet) return 3;
  if (isLargeDevice) return 2;
  return 1;
};

export const getColumnWidth = (columns = 1, gap = 16) => {
  const totalGap = gap * (columns - 1);
  return (SCREEN_WIDTH - (responsivePadding(20) * 2) - totalGap) / columns;
};

// Responsive breakpoints
export const BREAKPOINTS = {
  xs: 320,
  sm: 375,
  md: 414,
  lg: 768,
  xl: 1024
};

export const getDeviceType = () => {
  if (SCREEN_WIDTH < BREAKPOINTS.sm) return 'xs';
  if (SCREEN_WIDTH < BREAKPOINTS.md) return 'sm';
  if (SCREEN_WIDTH < BREAKPOINTS.lg) return 'md';
  if (SCREEN_WIDTH < BREAKPOINTS.xl) return 'lg';
  return 'xl';
};

// Export screen dimensions
export { SCREEN_WIDTH, SCREEN_HEIGHT };

// Platform-specific adjustments
export const platformShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  android: {
    elevation: 3,
  },
});

// Responsive grid system
export const GRID_SPACING = responsivePadding(16);
export const CARD_BORDER_RADIUS = scaleSize(12);
export const BUTTON_BORDER_RADIUS = scaleSize(8);