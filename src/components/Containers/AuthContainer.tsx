import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { theme } from '../../styles/theme';

export const AuthContainer = styled(Box)`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  position: relative;
  background-color: ${theme.palette.custom.black};
`;
