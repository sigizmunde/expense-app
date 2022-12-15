import { useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { ColorBullet } from '../ColorBadges/ColorBullet';

export function TransactionCategory({ categoryId }: { categoryId: number }) {
  const categories = useAppSelector(dataSelectors.getCategories);
  return (
    <>
      <ColorBullet
        color={
          categories.find(({ id }) => id === categoryId)?.color || '#88888880'
        }
      />
      {categories.find(({ id }) => id === categoryId)?.label || 'unknown'}
    </>
  );
}
