import { CategoriesContainer } from '../../components/CategoriesPanels/CategoriesContainer';
import { CategoriesPanel } from '../../components/CategoriesPanels/CategoriesPanel';
import { CategoriesTable } from '../../components/CategoriesTable/CategoriesTable';

export function Categories() {
  return (
    <CategoriesContainer>
      <CategoriesPanel>
        <CategoriesTable />
      </CategoriesPanel>
    </CategoriesContainer>
  );
}
