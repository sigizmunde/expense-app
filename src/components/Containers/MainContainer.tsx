import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  position: 'relative',
  backgroundColor: theme.palette.custom.bgr,
}));
