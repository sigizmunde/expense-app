import { styled } from '@mui/material';
import Container from '@mui/material/Container';

export const RightPanel = styled(Container)(({ theme, ...props }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  flex: '3 3',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));
