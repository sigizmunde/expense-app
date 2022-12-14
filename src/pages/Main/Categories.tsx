import { FC } from 'react';
import { CategoriesContainer } from '../../components/CategoriesPanels/CategoriesContainer';
import { CategoriesPanel } from '../../components/CategoriesPanels/CategoriesPanel';
import { CategoriesTable } from '../../components/CategoriesTable/CategoriesTable';

export const Categories: FC = () => {
  return (
    <CategoriesContainer>
      <CategoriesPanel>
        <CategoriesTable />
      </CategoriesPanel>
    </CategoriesContainer>
  );
};
