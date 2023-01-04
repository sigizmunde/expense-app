import { CalendarBlock } from '../../components/CalendarBlock/CalendarBlock';
import { ChartPanelOnAnalytics } from '../../components/ChartPanels/ChartPanelOnAnalytics';
import { DashboardContainer } from '../../components/DashboardPanels/DashboardContainer';
import { DashPanel } from '../../components/DashboardPanels/DashPanel';
import { RightPanel } from '../../components/DashboardPanels/RightPanel';
import { DashHeader } from '../../components/DashHeader/DashHeader';

export function Analytics() {
  return (
    <DashboardContainer>
      <DashPanel>
        <DashHeader />
        <ChartPanelOnAnalytics />
      </DashPanel>
      <RightPanel>
        <CalendarBlock />
      </RightPanel>
    </DashboardContainer>
  );
}
