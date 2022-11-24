import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { theme } from '../../styles/theme';

export const AuthBox = styled(Box)`
  height: 100vh;
  min-width: 50%;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  background-color: ${theme.palette.custom.black};
`;
