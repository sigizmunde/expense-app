import { FC } from 'react';
import { CardBox } from '../Containers/CardBox';
import { CategoryForm } from '../Forms/CategoryForm';
import { PanelTitle } from '../Typography/Typography';

export const EditCategoryBoard: FC<{
  id: number;
  afterSubmit: { (): void };
}> = ({ id, afterSubmit }) => {
  return (
    <CardBox bgcolor="blue70" gridColumn="span 4">
      <PanelTitle>Edit Transaction</PanelTitle>
      <CategoryForm categoryId={id} afterSubmit={afterSubmit} />
    </CardBox>
  );
};
