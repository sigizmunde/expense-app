import { FC } from 'react';
import { CategoriesTable } from '../../components/CategoriesTable/CategoriesTable';
import { DashboardContainer } from '../../components/DashboardPanels/DashboardContainer';
import { DashPanel } from '../../components/DashboardPanels/DashPanel';
import { RightPanel } from '../../components/DashboardPanels/RightPanel';
import { DashHeader } from '../../components/DashHeader/DashHeader';
import { TransactionTable } from '../../components/TransactionsTable/TransactionsTable';

export const Dashboard: FC = () => {
  return (
    <DashboardContainer>
      <DashPanel>
        <DashHeader />
        <TransactionTable />
      </DashPanel>
      <RightPanel>
        <CategoriesTable />
      </RightPanel>
    </DashboardContainer>
  );
};
