import { FC } from 'react';
import { CardBox } from '../Containers/CardBox';
import { AddTransactionForm } from '../Forms/AddTransactionForm';
import { PanelTitle } from '../Typography/Typography';

export const AddTransactionBoard: FC = () => {
  return (
    <CardBox bgcolor="violet70" gridColumn="span 4">
      <PanelTitle>Add Transaction</PanelTitle>
      <AddTransactionForm />
    </CardBox>
  );
};
