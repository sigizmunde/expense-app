import { FC } from 'react';
import { CardBox } from '../Containers/CardBox';
import { CategoryForm } from '../Forms/CategoryForm';
import { PanelTitle } from '../Typography/Typography';

export const AddCategoryBoard: FC = () => {
  return (
    <CardBox bgcolor="blue70" gridColumn="span 3">
      <PanelTitle>Add Category</PanelTitle>
      <CategoryForm />
    </CardBox>
  );
};
