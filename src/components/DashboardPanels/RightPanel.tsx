import { styled } from '@mui/material';
import Container from '@mui/material/Container';

export const RightPanel = styled(Container)(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  height: '100%',
  flex: '3 3',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  overflowY: 'auto',
  [theme.breakpoints.down('md')]: {
    flex: 'unset',
    height: 'auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
}));
