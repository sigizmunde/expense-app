import { FC } from 'react';
import { AddCategoryBoard } from '../../components/AddCategoryBoard/AddCategoryBoard';
import { AddTransactionBoard } from '../../components/AddTransactionBoard/AddTransactionBoard';
import { CategoriesTable } from '../../components/CategoriesTable/CategoriesTable';
import { DashboardContainer } from '../../components/DashboardPanels/DashboardContainer';
import { DashPanel } from '../../components/DashboardPanels/DashPanel';
import { RightPanel } from '../../components/DashboardPanels/RightPanel';
import { DashHeader } from '../../components/DashHeader/DashHeader';
import { TransactionsBoard } from '../../components/TransactionsBoard/TransactionsBoard';

export const Dashboard: FC = () => {
  return (
    <DashboardContainer>
      <DashPanel>
        <DashHeader />
        <AddTransactionBoard />
        <AddCategoryBoard />
        <TransactionsBoard />
      </DashPanel>
      <RightPanel>
        <CategoriesTable />
      </RightPanel>
    </DashboardContainer>
  );
};
