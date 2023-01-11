import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  height: '100vh',
  minHeight: '700px',
  width: '100vw',
  maxWidth: theme.breakpoints.values.xl,
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  position: 'relative',
  backgroundColor: theme.palette.custom.bgr,
  [theme.breakpoints.down('md')]: {
    height: 'auto',
  },
}));
