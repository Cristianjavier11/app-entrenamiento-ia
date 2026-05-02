import { Platform } from 'react-native';

const primaryColor = '#FF5A5F'; // A vibrant coral/red for energy
const secondaryColor = '#1C1C1E'; // Deep dark for modern feel

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: '#687076',
    background: '#F7F9FC', // Light grayish blue
    surface: '#FFFFFF', // Cards and elements
    primary: primaryColor,
    tint: primaryColor,
    icon: '#687076',
    tabIconDefault: '#A0AAB2',
    tabIconSelected: primaryColor,
    border: '#EAEFEF',
    success: '#34C759',
    danger: '#FF3B30',
  },
  dark: {
    text: '#FFFFFF',
    textSecondary: '#A0AAB2',
    background: '#0D0D0D', // Very dark
    surface: '#1C1C1E', // Slightly lighter for cards
    primary: primaryColor,
    tint: primaryColor,
    icon: '#A0AAB2',
    tabIconDefault: '#687076',
    tabIconSelected: primaryColor,
    border: '#2C2C2E',
    success: '#30D158',
    danger: '#FF453A',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};
