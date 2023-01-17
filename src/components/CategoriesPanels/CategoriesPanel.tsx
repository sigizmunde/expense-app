import { styled } from '@mui/material';
import Container from '@mui/material/Container';

export const CategoriesPanel = styled(Container)(({ theme }) => ({
  '&.MuiContainer-root': {
    maxWidth: 'unset',
  },
  backgroundColor: theme.palette.custom.blue70,
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));
