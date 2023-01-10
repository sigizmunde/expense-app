import { createTheme } from '@mui/material';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/400.css';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    custom: { [key: string]: string };
  }
  interface Palette {
    custom: { [key: string]: string };
  }
}

const initialTheme = createTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 600,
      md: 940,
      lg: 1200,
      xl: 1536,
    },
  },
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
      violet70: 'rgba(212, 204, 241, 0.7)',
      blue: '#69B0FF',
      blue70: '#D9E7F8',
      orange: '#F08E5B',
      red: '#EE5E5E',
      green: '#B2D0AD',
      greener: '#539713',
      grey: '#A19EAA',
      white: '#FFFFFF',
      bgr: '#F5F5F5',
      disabled: '#A19EAA',
    },
  },
  spacing: [4, 8, 16, 24, 32, 64, 128],
  typography: {
    allVariants: {
      fontFamily: ['Montserrat', 'sans-serif'].join(','),
      fontSize: 16,
      color: 'inherit',
    },
  },
});

const { breakpoints } = initialTheme;

export const theme = createTheme(initialTheme, {
  typography: {
    h1: {
      textTransform: 'uppercase',
      fontSize: '56px',
      fontWeight: 700,
      letterSpacing: '0.03',
      lineHeight: '1.5',
      [breakpoints.down('md')]: {
        fontSize: '45px',
      },
    },
    h2: {
      fontSize: '48px',
      fontWeight: 700,
      lineHeight: '1.5',
      [breakpoints.down('md')]: {
        fontSize: '38px',
      },
    },
    h3: {
      fontSize: '36px',
      fontWeight: 700,
      lineHeight: '1.5',
      [breakpoints.down('md')]: {
        fontSize: '28px',
      },
    },
    h4: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '36px',
      [breakpoints.down('md')]: {
        fontSize: '18px',
      },
    },
    h5: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '25px',
      [breakpoints.down('md')]: {
        fontSize: '12px',
      },
    },
    body1: {
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '31px',
      [breakpoints.down('md')]: {
        fontSize: '16px',
      },
    },
    body2: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '25px',
      [breakpoints.down('md')]: {
        fontSize: '13px',
      },
    },
    subtitle1: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '22px',
      [breakpoints.down('md')]: {
        fontSize: '11px',
      },
    },
    subtitle2: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '19px',
      [breakpoints.down('md')]: {
        fontSize: '10px',
      },
    },
  },
});
