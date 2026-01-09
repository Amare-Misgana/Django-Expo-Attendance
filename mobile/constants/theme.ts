import { Platform } from 'react-native';

const tintColorLight = '#FD8A6B';
const tintColorDark = '#FA5C5C';

export const Colors = {
  light: {
    primary: '#FA5C5C',
    primaryDisabled: '#FAD1D1',
    secondary: '#FD8A6B',
    secondaryDisabled: '#FDE2C7',
    accent: '#FBEF76',
    accentDisabled: '#FFF7C2',

    textPrimary: '#11181C',
    textSecondary: '#303030',
    textLast: '#525252',

    background: '#f5f5f5ff',
    backgroundEdge: "#fafafaff",
    surface: '#F6F6F6',

    tint: tintColorLight,

    icon: '#687076',
    border: '#d3d2d2ff',

    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },

  dark: {
    primary: '#FA5C5C',
    primaryDisabled: '#7A3C3C',
    secondary: '#FD8A6B',
    secondaryDisabled: '#7A4C3C',
    accent: '#FBEF76',
    accentDisabled: '#7A793C',

    textPrimary: '#ECEDEE',
    textSecondary: '#acacacff',
    textLast: '#9A9A9A',

    background: '#151718',
    backgroundEdge: '#161718ff',
    surface: '#1E2022',

    tint: tintColorDark,

    icon: '#9BA1A6',
    border: '#524f4bff',

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
