import { CardBox } from '../Containers/CardBox';
import { CategoryForm } from '../Forms/CategoryForm';
import { PanelTitle } from '../Typography/Typography';

export function EditCategoryBoard({
  id,
  afterSubmit,
}: {
  id: number;
  afterSubmit: { (): void };
}) {
  return (
    <CardBox bgcolor="blue70" gridColumn="span 4">
      <PanelTitle>Edit Category</PanelTitle>
      <CategoryForm categoryId={id} afterSubmit={afterSubmit} />
    </CardBox>
  );
}
