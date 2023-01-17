import { styled, Box } from '@mui/material';

export const HideOnMobile = styled(Box)(({ theme }) => ({
  padding: 0,
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const HideNotOnMobile = styled(Box)(({ theme }) => ({
  padding: 0,
  margin: 0,
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

export const HideOnTablet = styled(Box)(({ theme }) => ({
  padding: 0,
  margin: 0,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const RotateOnMobile = styled(Box)(({ theme }) => ({
  padding: 0,
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    position: 'relative',
    transform: 'rotate(-90deg)',
  },
}));
