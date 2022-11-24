import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const PhotoBox = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  position: 'relative',
  backgroundColor: theme.palette.custom.black,
  backgroundPosition: 'top',
  backgroundSize: 'cover',
}));
