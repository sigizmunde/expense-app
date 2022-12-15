import { CardBox } from '../Containers/CardBox';
import { TransactionForm } from '../Forms/TransactionForm';
import { PanelTitle } from '../Typography/Typography';

export function AddTransactionBoard() {
  return (
    <CardBox bgcolor="violet70" gridColumn="span 4">
      <PanelTitle>Add Transaction</PanelTitle>
      <TransactionForm />
    </CardBox>
  );
}
