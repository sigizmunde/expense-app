import { AddCategoryBoard } from '../../components/AddCategoryBoard/AddCategoryBoard';
import { AddTransactionBoard } from '../../components/AddTransactionBoard/AddTransactionBoard';
import { ChartPanelWeekly } from '../../components/ChartPanels/ChartPanelWeekly';
import { DashboardContainer } from '../../components/DashboardPanels/DashboardContainer';
import { DashPanel } from '../../components/DashboardPanels/DashPanel';
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
      <ChartPanelWeekly />
    </DashboardContainer>
  );
}
