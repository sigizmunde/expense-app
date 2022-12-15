import { CardBox } from '../Containers/CardBox';
import { CategoryForm } from '../Forms/CategoryForm';
import { PanelTitle } from '../Typography/Typography';

export function AddCategoryBoard() {
  return (
    <CardBox bgcolor="blue70" gridColumn="span 3">
      <PanelTitle>Add Category</PanelTitle>
      <CategoryForm />
    </CardBox>
  );
}
