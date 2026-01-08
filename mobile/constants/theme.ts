import { Platform } from 'react-native';

const tintColorLight = '#FD8A6B';
const tintColorDark = '#FA5C5C';

export const Colors = {
  light: {
    primary: '#FA5C5C',
    secondary: '#FD8A6B',
    accent: '#FBEF76',

    textPrimary: '#11181C',
    textSecondary: '#303030',
    textLast: '#525252',

    background: '#FFFFFF',
    surface: '#F6F6F6',

    tint: tintColorLight,

    icon: '#687076',
    border: '#E0E0E0',

    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },

  dark: {
    primary: '#FA5C5C',
    secondary: '#FD8A6B',
    accent: '#FBEF76',

    textPrimary: '#ECEDEE',
    textSecondary: '#C7C7C7',
    textLast: '#9A9A9A',

    background: '#151718',
    surface: '#1E2022',

    tint: tintColorDark,

    icon: '#9BA1A6',
    border: '#2A2D2F',

    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'Poppins',
    serif: 'Poppins',
    rounded: 'Poppins',
    mono: 'Poppins',
  },
  android: {
    sans: 'Poppins',
    serif: 'Poppins',
    rounded: 'Poppins',
    mono: 'Poppins',
  },
  web: {
    sans: 'Poppins, system-ui, sans-serif',
    serif: 'Poppins, serif',
    rounded: 'Poppins, system-ui, sans-serif',
    mono: 'monospace',
  },
});
