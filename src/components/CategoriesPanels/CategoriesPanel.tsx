import { styled } from '@mui/material';
import Container from '@mui/material/Container';

export const CategoriesPanel = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.custom.blue70,
  width: '100%',
  padding: theme.spacing(5),
  gap: theme.spacing(3),
}));
