import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { styled, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { statisticsSelectors } from '../../store/statistics/statisticsSelectors';
import { uixSelectors } from '../../store/uix/uixSelectors';
import {
  IAreaDiagramDataRecord,
  IBarDiagramDataRecord,
  ICircleDiagramDataRecord,
  TPeriodType,
} from '../../types/data';
import { ChartNameWithIcon } from '../Charts/ChartNameWithIcon';
import { RadialBarDiagram } from '../Charts/RadialBarDiagram';
import { CardBox } from '../Containers/CardBox';
import { ReactComponent as ChartIcon } from '../../images/icons/pie-chart.svg';
import { ReactComponent as TransactionIcon } from '../../images/icons/transaction.svg';
import { ExpenseIncomeAreaChart } from '../Charts/ExpenseIncomeAreaChart';
import {
  reduceTransactionsToCircleBarData,
  reduceTransactionsToAreaChartData,
  reduceTransactionsToBarChartData,
} from './dataChartConversionFunctions';
import { TransactionsBarChart } from '../Charts/TransactionsBarChart';

const StatisticsHeading = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  textTransform: 'capitalize',
}));

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
  const [barChartData, setBarChartData] = useState<IBarDiagramDataRecord[]>([]);

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
      setBarChartData(
        reduceTransactionsToBarChartData({
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
        style={{ overflow: 'hidden', minHeight: '298px' }}
      >
        <StatisticsHeading>
          Income expense statistics for {periodType}
        </StatisticsHeading>
        <ExpenseIncomeAreaChart data={areaChartData} expense income axis />
      </CardBox>
      <CardBox
        height="100%"
        gridColumn="span 3"
        style={{ overflow: 'hidden', minHeight: '298px' }}
      >
        <ChartNameWithIcon color="red" caption="Expense by categories">
          <ChartIcon />
        </ChartNameWithIcon>
        <RadialBarDiagram data={circleDiagData} />
      </CardBox>
      <CardBox
        height="100%"
        gridColumn="span 4"
        style={{ overflow: 'hidden', minHeight: '256px' }}
      >
        <ChartNameWithIcon color="violet" caption="Number of transactions">
          <TransactionIcon />
        </ChartNameWithIcon>
        <TransactionsBarChart data={barChartData} axis />
      </CardBox>
    </>
  );
}
