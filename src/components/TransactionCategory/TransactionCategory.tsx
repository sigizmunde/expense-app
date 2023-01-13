import { Box, styled } from '@mui/material';
import { useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { ColorBullet } from '../ColorBadges/ColorBullet';

const AdaptiveWrapper = styled(Box)(({ theme }) => ({
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'baseline',
  [theme.breakpoints.down('sm')]: {
    '& > :not(:first-of-type)': {
      display: 'none',
    },
  },
}));

export function TransactionCategory({ categoryId }: { categoryId: number }) {
  const categories = useAppSelector(dataSelectors.getCategories);
  return (
    <AdaptiveWrapper>
      <ColorBullet
        color={
          categories.find(({ id }) => id === categoryId)?.color || '#88888880'
        }
      />
      <span>
        {categories.find(({ id }) => id === categoryId)?.label || 'unknown'}
      </span>
    </AdaptiveWrapper>
  );
}
