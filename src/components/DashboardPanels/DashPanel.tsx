import { styled } from '@mui/material';
import Container from '@mui/material/Container';

export const DashPanel = styled(Container)(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  flex: '7 7',
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  alignContent: 'start',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));
