import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    custom: { [key: string]: string | number };
  }
  interface Palette {
    custom: { [key: string]: string | number };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#539713',
      light: '#B2D0AD',
      dark: '#539713',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1D283A',
    },
    error: {
      main: '#EE5E5E',
    },
    success: {
      main: '#539713',
    },
    custom: {
      black: '#1D283A',
      violet: '#D4CCF1',
      blue: '#69B0FF',
      orange: '#F08E5B',
      red: '#EE5E5E',
      green: '#B2D0AD',
      greener: '#539713',
      white: '#FFFFFF',
      bgr: '#F5F5F5',
      disabled: '#A19EAA',
    },
  },
  spacing: [4, 8, 16, 24, 32, 64],
  typography: {
    allVariants: {
      fontFamily: ['Montserrat', 'sans-serif'].join(','),
      fontSize: 16,
      color: '#fff',
    },
    h1: {
      textTransform: 'uppercase',
      fontSize: '56px',
      fontWeight: 700,
      letterSpacing: '3%',
      lineHeight: '84px',
    },
    h2: {
      fontSize: '48px',
      fontWeight: 700,
      lineHeight: '72px',
    },
    h3: {
      fontSize: '36px',
      fontWeight: 700,
      lineHeight: '54px',
    },
    h4: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '36px',
    },
    h5: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '25px',
    },
    body1: {
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '31px',
    },
    body2: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '25px',
    },
    subtitle1: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '22px',
    },
    subtitle2: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '19px',
    },
  },
});
