import Container from '@mui/material/Container';
import { styled } from '@mui/material';
import { useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { CategoryCard } from '../CategoryCard/CategoryCard';

const TableGrid = styled(Container)(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(3),
}));

export function CategoriesTable() {
  const categories = useAppSelector(dataSelectors.getCategories);

  return (
    <TableGrid>
      {categories && categories.map((e) => <CategoryCard key={e.id} {...e} />)}
    </TableGrid>
  );
}
