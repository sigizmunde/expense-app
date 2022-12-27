import { styled, Container, Box, Typography } from '@mui/material';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { SearchInput } from '../Inputs/SearchInput';

const BlockHeader = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: theme.spacing(3),
  padding: `0 ${theme.spacing(5)}`,
  marginBottom: `calc(${theme.spacing(4)} + ${theme.spacing(1)})`,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const TableName = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
}));

const TableGrid = styled(Container)(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(3),
  '&.MuiContainer-root': {
    maxWidth: 'unset',
    padding: `0 calc(${theme.spacing(4)} + ${theme.spacing(2)})`,
  },
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'unset',
  },
}));

export function CategoriesTable() {
  const fetchedCategories = useAppSelector(dataSelectors.getCategories);
  const [searchWord, setSearchWord] = useState('');
  const [categories, setCategories] = useState(fetchedCategories);

  const filterCategories = () => {
    setCategories(
      fetchedCategories.filter((c) =>
        c.label.toLowerCase().includes(searchWord.trim().toLowerCase())
      )
    );
  };

  useEnhancedEffect(() => {
    const timer = setTimeout(() => filterCategories(), 250);
    return () => clearTimeout(timer);
  }, [filterCategories]);

  return (
    <>
      <BlockHeader>
        <TableName>
          {searchWord === ''
            ? 'All Categories'
            : `Search result for ${searchWord.trim()}`}
        </TableName>
        <SearchInput
          name="category"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </BlockHeader>
      <TableGrid>
        {categories.map((e) => (
          <CategoryCard key={e.id} {...e} />
        ))}
      </TableGrid>
    </>
  );
}
