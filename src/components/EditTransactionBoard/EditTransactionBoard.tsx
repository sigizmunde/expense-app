import { FC } from 'react';
import { CardBox } from '../Containers/CardBox';
import { TransactionForm } from '../Forms/TransactionForm';
import { PanelTitle } from '../Typography/Typography';

export const EditTransactionBoard: FC<{
  id: number;
  afterSubmit: { (): void };
}> = ({ id, afterSubmit }) => {
  return (
    <CardBox bgcolor="violet70" gridColumn="span 4">
      <PanelTitle>Edit Transaction</PanelTitle>
      <TransactionForm transactionId={id} afterSubmit={afterSubmit} />
    </CardBox>
  );
};
