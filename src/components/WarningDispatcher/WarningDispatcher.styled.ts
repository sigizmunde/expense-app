import { Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAlert = styled(Alert)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(5),
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 9,
}));
