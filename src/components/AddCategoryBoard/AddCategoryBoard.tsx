import { FC } from 'react';
import { CardBox } from '../Containers/CardBox';
import { AddCategoryForm } from '../Forms/AddCategoryForm';
import { PanelTitle } from '../Typography/Typography';

export const AddCategoryBoard: FC = () => {
  return (
    <CardBox bgcolor="blue70" gridColumn="span 3">
      <PanelTitle>Add Category</PanelTitle>
      <AddCategoryForm />
    </CardBox>
  );
};
