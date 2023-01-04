import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { getCategories } from '../../store/data/dataThunk';
import { statisticsSelectors } from '../../store/statistics/statisticsSelectors';
import { getStatistics } from '../../store/statistics/statisticsThunk';
import { uixSelectors } from '../../store/uix/uixSelectors';
import {
  IAreaDiagramDataRecord,
  ICircleDiagramDataRecord,
  TPeriodType,
} from '../../types/data';
import { ChartNameWithIcon } from '../Charts/ChartNameWithIcon';
import { RadialBarDiagram } from '../Charts/RadialBarDiagram';
import { CardBox } from '../Containers/CardBox';
import { RightPanel } from '../DashboardPanels/RightPanel';
import { ReactComponent as ChartIcon } from '../../images/icons/pie-chart.svg';
import { ReactComponent as IncomeIcon } from '../../images/icons/income.svg';
import { ReactComponent as ExpenseIcon } from '../../images/icons/expenses.svg';
import { ExpenseIncomeAreaChart } from '../Charts/ExpenseIncomeAreaChart';
import CalendarButtons from '../CalendarButtons/CalendarButtons';
import {
  reduceTransactionsToCircleBarData,
  reduceTransactionsToAreaChartData,
} from './dataChartConversionFunctions';

export function ChartPanelOnDashboard() {
  const dispatch = useAppDispatch();
  const [periodType, setPeriodType] = useState<TPeriodType>('week');
  const isFetching = useAppSelector(uixSelectors.getIsFetching);
  const categories = useAppSelector(dataSelectors.getCategories);
  const statistics = useAppSelector(statisticsSelectors.getStatistics);
  const [circleDiagData, setCircleDiagData] = useState<
    ICircleDiagramDataRecord[]
  >([]);
  const [expenseChartData, setExpenseDiagData] = useState<
    IAreaDiagramDataRecord[]
  >([]);
  const [incomeChartData, setIncomeDiagData] = useState<
    IAreaDiagramDataRecord[]
  >([]);

  const handlePeriodTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newPeriodType: TPeriodType
  ) => {
    setPeriodType(newPeriodType);
  };

  useEffect(() => {
    const { transactions, dateFrom, dateTo } = statistics;
    const periodStart =
      periodType === 'day'
        ? dayjs()
            .subtract(1, periodType)
            .add(1, 'minute')
            .millisecond(0)
            .second(0)
            .toISOString()
        : dayjs()
            .subtract(1, periodType)
            .add(1, 'day')
            .hour(23)
            .minute(59)
            .second(59)
            .millisecond(999)
            .toISOString();
    const periodEnd =
      periodType === 'day'
        ? dayjs().add(1, 'minute').millisecond(0).second(0).toISOString()
        : dayjs().hour(23).minute(59).second(59).millisecond(999).toISOString();

    if (!isFetching) {
      if (!(categories.length > 0)) {
        dispatch(getCategories);
      }
      if (dateFrom !== periodStart || dateTo !== periodEnd) {
        dispatch(
          getStatistics({
            dateFrom: periodStart,
            dateTo: periodEnd,
          })
        );
      }
      setCircleDiagData(
        reduceTransactionsToCircleBarData({ transactions, categories })
      );
      setExpenseDiagData(
        reduceTransactionsToAreaChartData({
          transactions,
          type: 'expense',
          startDate: periodStart,
          periodType,
        })
      );
      setIncomeDiagData(
        reduceTransactionsToAreaChartData({
          transactions,
          type: 'income',
          startDate: periodStart,
          periodType,
        })
      );
    }
  }, [statistics, dispatch, categories, isFetching, periodType]);

  return (
    <RightPanel>
      <CalendarButtons value={periodType} onChange={handlePeriodTypeChange} />
      <CardBox height="25%" style={{ overflow: 'hidden', marginTop: '-10px' }}>
        <ChartNameWithIcon color="greener" caption={`${periodType} receipt`}>
          <IncomeIcon />
        </ChartNameWithIcon>
        <ExpenseIncomeAreaChart data={incomeChartData} income />
      </CardBox>
      <CardBox height="25%" style={{ overflow: 'hidden' }}>
        <ChartNameWithIcon color="red" caption={`${periodType} expense`}>
          <ExpenseIcon />
        </ChartNameWithIcon>
        <ExpenseIncomeAreaChart data={expenseChartData} expense />
      </CardBox>
      <CardBox height="50%" style={{ overflow: 'hidden' }}>
        <ChartNameWithIcon
          color="red"
          caption={`By categories per ${periodType}`}
        >
          <ChartIcon />
        </ChartNameWithIcon>
        <RadialBarDiagram data={circleDiagData} />
      </CardBox>
    </RightPanel>
  );
}
