import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { styled } from '@mui/material';
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
import { ChartNameWithValue } from '../Charts/ChartNameWithValue';
import { moneyNumToString } from '../../utils/moneyNumToString';

const ChartPanelWrapper = styled(RightPanel)(({ theme }) => ({
  '& > :first-of-type': {
    marginBottom: '-10px',
  },
  [theme.breakpoints.down('md')]: {
    order: '-1',
    '& > :first-of-type': {
      marginBottom: 0,
    },
  },
}));

export function ChartPanelOnDashboard() {
  const dispatch = useAppDispatch();
  const [periodType, setPeriodType] = useState<TPeriodType>('week');
  const isFetching = useAppSelector(uixSelectors.getIsFetching);
  const categories = useAppSelector(dataSelectors.getCategories);
  const statistics = useAppSelector(statisticsSelectors.getStatistics);
  const [overalExpense, setOveralExpense] = useState(0);
  const [overalIncome, setOveralIncome] = useState(0);
  const [circleDiagData, setCircleDiagData] = useState<
    ICircleDiagramDataRecord[]
  >([]);
  const [expenseChartData, setExpenseChartData] = useState<
    IAreaDiagramDataRecord[]
  >([]);
  const [incomeChartData, setIncomeChartData] = useState<
    IAreaDiagramDataRecord[]
  >([]);

  const handlePeriodTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newPeriodType: TPeriodType
  ) => {
    setPeriodType(newPeriodType);
  };

  useEffect(() => {
    if (isFetching) return;

    const { transactions, dateFrom, dateTo } = statistics;
    const periodStart =
      periodType === 'day'
        ? dayjs().subtract(1, periodType).millisecond(0).second(0).toISOString()
        : dayjs()
            .subtract(1, periodType)
            .hour(23)
            .minute(59)
            .second(59)
            .millisecond(999)
            .toISOString();
    const periodEnd =
      periodType === 'day'
        ? dayjs().add(1, 'minute').millisecond(0).second(0).toISOString()
        : dayjs().hour(23).minute(59).second(59).millisecond(999).toISOString();

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
    setExpenseChartData(
      reduceTransactionsToAreaChartData({
        transactions,
        type: 'expense',
        startDate: periodStart,
        periodType,
      })
    );
    setIncomeChartData(
      reduceTransactionsToAreaChartData({
        transactions,
        type: 'income',
        startDate: periodStart,
        periodType,
      })
    );
    setOveralIncome(
      transactions
        .filter((e) => e.amount > 0)
        .reduce((acc, e) => acc + e.amount, 0)
    );
    setOveralExpense(
      transactions
        .filter((e) => e.amount < 0)
        .reduce((acc, e) => acc + e.amount, 0)
    );
  }, [statistics, dispatch, categories, isFetching, periodType]);

  return (
    <ChartPanelWrapper>
      <CalendarButtons value={periodType} onChange={handlePeriodTypeChange} />
      <CardBox
        height="25%"
        style={{
          overflow: 'hidden',
          minHeight: '140px',
        }}
      >
        <ChartNameWithValue
          color="greener"
          caption={`${periodType} receipt`}
          value={moneyNumToString({ amount: overalIncome })}
        >
          <IncomeIcon />
        </ChartNameWithValue>
        <ExpenseIncomeAreaChart data={incomeChartData} income />
      </CardBox>
      <CardBox height="25%" style={{ overflow: 'hidden', minHeight: '140px' }}>
        <ChartNameWithValue
          color="red"
          caption={`${periodType} expense`}
          value={moneyNumToString({ amount: overalExpense, negative: true })}
        >
          <ExpenseIcon />
        </ChartNameWithValue>
        <ExpenseIncomeAreaChart data={expenseChartData} expense />
      </CardBox>
      <CardBox height="50%" style={{ overflow: 'hidden', minHeight: '298px' }}>
        <ChartNameWithIcon
          color="red"
          caption={`By categories per ${periodType}`}
        >
          <ChartIcon />
        </ChartNameWithIcon>
        <RadialBarDiagram data={circleDiagData} />
      </CardBox>
    </ChartPanelWrapper>
  );
}
