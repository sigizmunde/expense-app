import { CardBox } from '../Containers/CardBox';
import { TransactionForm } from '../Forms/TransactionForm';
import { PanelTitle } from '../Typography/Typography';

export function EditTransactionBoard({
  id,
  afterSubmit,
}: {
  id: number;
  afterSubmit: { (): void };
}) {
  return (
    <CardBox bgcolor="violet70" gridColumn="span 4">
      <PanelTitle>Edit Transaction</PanelTitle>
      <TransactionForm transactionId={id} afterSubmit={afterSubmit} />
    </CardBox>
  );
}
