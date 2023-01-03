import { CalendarBlock } from '../../components/CalendarBlock/CalendarBlock';
import { DashboardContainer } from '../../components/DashboardPanels/DashboardContainer';
import { DashPanel } from '../../components/DashboardPanels/DashPanel';
import { RightPanel } from '../../components/DashboardPanels/RightPanel';
import { DashHeader } from '../../components/DashHeader/DashHeader';

export function Analytics() {
  return (
    <DashboardContainer>
      <DashPanel>
        <DashHeader />
      </DashPanel>
      <RightPanel>
        <CalendarBlock />
      </RightPanel>
    </DashboardContainer>
  );
}
