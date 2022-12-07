import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const AuthContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  position: 'relative',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.custom.black,
}));
