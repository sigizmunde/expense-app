import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { theme } from '../../styles/theme';

export const PhotoBox = styled(Box)`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-color: ${theme.palette.custom.black};
  background-position: top;
  background-size: cover;
`;
