import { FC } from 'react';
import { DashboardContainer } from '../../components/DashboardPanels/DashboardContainer';
import { DashPanel } from '../../components/DashboardPanels/DashPanel';
import { RightPanel } from '../../components/DashboardPanels/RightPanel';

export const Dashboard: FC = () => {
  return (
    <DashboardContainer>
      <DashPanel></DashPanel>
      <RightPanel></RightPanel>
    </DashboardContainer>
  );
};
