import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { getCategories } from '../../store/data/dataThunk';
import { statisticsSelectors } from '../../store/statistics/statisticsSelectors';
import { getStatistics } from '../../store/statistics/statisticsThunk';
import { uixSelectors } from '../../store/uix/uixSelectors';
import { ICircleDiagramDataRecord } from '../../types/data';
import { generateColor } from '../../utils/colorLibraryGenerator';
import { getWeekEnd, getWeekStart } from '../../utils/dateFunctions';
import { RadialBarDiagram } from '../Charts/RadialBarDiagram';
import { RightPanel } from '../DashboardPanels/RightPanel';

export function ChartPanelWeekly() {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(uixSelectors.getIsFetching);
  const categories = useAppSelector(dataSelectors.getCategories);
  const statistics = useAppSelector(statisticsSelectors.getStatistics);
  const [circleDiagData, setCircleDiagData] = useState<
    ICircleDiagramDataRecord[]
  >([]);

  useEffect(() => {
    const { transactions, dateFrom, dateTo } = statistics;
    const weekStart = getWeekStart(new Date()).toISOString();
    const weekEnd = getWeekEnd(new Date()).toISOString();

    if (!isFetching) {
      if (!(categories.length > 0)) {
        dispatch(getCategories);
      }
      if (dateFrom !== weekStart || dateTo !== weekEnd) {
        dispatch(
          getStatistics({
            dateFrom: weekStart,
            dateTo: weekEnd,
          })
        );
      }
      setCircleDiagData(
        transactions.reduce((acc: ICircleDiagramDataRecord[], rec) => {
          const currentRec = acc.find((el) => el.id === rec.categoryId);
          if (currentRec) {
            currentRec.value += rec.amount;
            return acc;
          }
          return [
            ...acc,
            {
              id: rec.categoryId,
              name:
                categories.find((e) => e.id === rec.categoryId)?.label ||
                'unknown',
              value: rec.amount,
              fill:
                categories.find((e) => e.id === rec.categoryId)?.color ||
                generateColor({ lightness: 0.75, darkness: 0.7 }),
            },
          ];
        }, [])
      );
    }
  }, [statistics, dispatch, categories, isFetching]);

  return (
    <RightPanel>
      <RadialBarDiagram data={circleDiagData} />
      <RadialBarDiagram data={circleDiagData} />
    </RightPanel>
  );
}
