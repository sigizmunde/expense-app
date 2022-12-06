import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';

export const CategoriesTable: FC = () => {
  const categories = useAppSelector(dataSelectors.getCategories);
  return (
    <>
      {categories &&
        categories.map((e) => (
          <div
            style={{ width: '100%', display: 'flex', gap: '24px' }}
            key={e.id}
          >
            <div>{e.id}</div>
            <div>{e.label}</div>
          </div>
        ))}
    </>
  );
};
