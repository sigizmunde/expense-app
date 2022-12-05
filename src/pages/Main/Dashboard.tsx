import { FC } from 'react';
import { DashboardContainer } from '../../components/DashboardPanels/DashboardContainer';
import { DashPanel } from '../../components/DashboardPanels/DashPanel';
import { RightPanel } from '../../components/DashboardPanels/RightPanel';
import { DashHeader } from '../../components/DashHeader/DashHeader';

export const Dashboard: FC = () => {
  return (
    <DashboardContainer>
      <DashPanel>
        <DashHeader />
      </DashPanel>
      <RightPanel></RightPanel>
    </DashboardContainer>
  );
};
