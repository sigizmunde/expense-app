import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const NavPanel = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '260px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'start',
  flexShrink: 0,
  position: 'relative',
  backgroundColor: theme.palette.custom.black,
}));
