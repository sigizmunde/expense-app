import { styled } from '@mui/material';
import Container from '@mui/material/Container';

export const DashPanel = styled(Container)(({ theme, ...props }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  flex: '7 7',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));
