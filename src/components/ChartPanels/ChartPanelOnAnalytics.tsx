import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { statisticsSelectors } from '../../store/statistics/statisticsSelectors';
import { uixSelectors } from '../../store/uix/uixSelectors';
import {
  IAreaDiagramDataRecord,
  ICircleDiagramDataRecord,
  TPeriodType,
} from '../../types/data';
import { ChartNameWithIcon } from '../Charts/ChartNameWithIcon';
import { RadialBarDiagram } from '../Charts/RadialBarDiagram';
import { CardBox } from '../Containers/CardBox';
import { ReactComponent as ChartIcon } from '../../images/icons/pie-chart.svg';
import { ReactComponent as ExpenseIcon } from '../../images/icons/expenses.svg';
import { ExpenseIncomeAreaChart } from '../Charts/ExpenseIncomeAreaChart';
import {
  reduceTransactionsToCircleBarData,
  reduceTransactionsToAreaChartData,
} from './dataChartConversionFunctions';

export function ChartPanelOnAnalytics() {
  const [periodType, setPeriodType] = useState<TPeriodType>('week');
  const isFetching = useAppSelector(uixSelectors.getIsFetching);
  const categories = useAppSelector(dataSelectors.getCategories);
  const statistics = useAppSelector(statisticsSelectors.getStatistics);
  const [circleDiagData, setCircleDiagData] = useState<
    ICircleDiagramDataRecord[]
  >([]);
  const [areaChartData, setAreaChartData] = useState<IAreaDiagramDataRecord[]>(
    []
  );

  useEffect(() => {
    const { dateFrom, dateTo } = statistics;
    const difference = dayjs(dateTo).diff(dateFrom, 'day');
    switch (true) {
      case difference > 60:
        setPeriodType('year');
        break;
      case difference > 14:
        setPeriodType('month');
        break;
      case difference > 1:
        setPeriodType('week');
        break;
      default:
        setPeriodType('day');
    }
  }, [statistics]);

  useEffect(() => {
    const { transactions, dateFrom } = statistics;

    if (!isFetching) {
      setCircleDiagData(
        reduceTransactionsToCircleBarData({ transactions, categories })
      );
      setAreaChartData(
        reduceTransactionsToAreaChartData({
          transactions,
          startDate: dateFrom,
          periodType,
        })
      );
    }
  }, [statistics, categories, isFetching, periodType]);

  return (
    <>
      <CardBox
        minHeight="38vh"
        height="100%"
        gridColumn="span 7"
        style={{ overflow: 'hidden' }}
      >
        <ChartNameWithIcon color="red" caption={`${periodType} expense income`}>
          <ExpenseIcon />
        </ChartNameWithIcon>
        <ExpenseIncomeAreaChart data={areaChartData} expense income />
      </CardBox>
      <CardBox height="100%" gridColumn="span 4" style={{ overflow: 'hidden' }}>
        <ChartNameWithIcon color="red" caption="Expense by categories">
          <ChartIcon />
        </ChartNameWithIcon>
        <RadialBarDiagram data={circleDiagData} />
      </CardBox>
      <CardBox height="100%" gridColumn="span 3" style={{ overflow: 'hidden' }}>
        <ChartNameWithIcon color="red" caption="Expense by categories">
          <ChartIcon />
        </ChartNameWithIcon>
        <RadialBarDiagram data={circleDiagData} />
      </CardBox>
    </>
  );
}
