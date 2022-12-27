import { AddCategoryBoard } from '../../components/AddCategoryBoard/AddCategoryBoard';
import { AddTransactionBoard } from '../../components/AddTransactionBoard/AddTransactionBoard';
import { DashboardContainer } from '../../components/DashboardPanels/DashboardContainer';
import { DashPanel } from '../../components/DashboardPanels/DashPanel';
import { RightPanel } from '../../components/DashboardPanels/RightPanel';
import { DashHeader } from '../../components/DashHeader/DashHeader';
import { TransactionsBoard } from '../../components/TransactionsBoard/TransactionsBoard';

export function Dashboard() {
  return (
    <DashboardContainer>
      <DashPanel>
        <DashHeader />
        <AddTransactionBoard />
        <AddCategoryBoard />
        <TransactionsBoard />
      </DashPanel>
      <RightPanel />
    </DashboardContainer>
  );
}
