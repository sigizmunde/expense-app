import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const AuthBox = styled(Box)(({ theme }) => ({
  height: '100vh',
  minWidth: '50%',
  width: '600px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  position: 'relative',
  backgroundColor: theme.palette.custom.black,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '100%',
  },
}));
