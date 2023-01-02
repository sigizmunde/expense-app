import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { getCategories } from '../../store/data/dataThunk';
import { statisticsSelectors } from '../../store/statistics/statisticsSelectors';
import { getStatistics } from '../../store/statistics/statisticsThunk';
import { uixSelectors } from '../../store/uix/uixSelectors';
import {
  IAreaDiagramDataRecord,
  ICategory,
  ICircleDiagramDataRecord,
  ITransaction,
} from '../../types/data';
import { generateColor } from '../../utils/colorLibraryGenerator';
import {
  getDateWithDefaultTime,
  getDayAWeekAgo,
  getDayName,
} from '../../utils/dateFunctions';
import { ChartNameWithIcon } from '../Charts/ChartNameWithIcon';
import { RadialBarDiagram } from '../Charts/RadialBarDiagram';
import { CardBox } from '../Containers/CardBox';
import { RightPanel } from '../DashboardPanels/RightPanel';
import { ReactComponent as ChartIcon } from '../../images/icons/pie-chart.svg';
import { ReactComponent as IncomeIcon } from '../../images/icons/income.svg';
import { ReactComponent as ExpenseIcon } from '../../images/icons/expenses.svg';
import { ExpenseIncomeAreaChart } from '../Charts/ExpenseIncomeAreaChart';

const reduceTransactionsToCircleBarData = ({
  transactions,
  categories,
}: {
  transactions: ITransaction[];
  categories: ICategory[];
}) =>
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
          categories.find((e) => e.id === rec.categoryId)?.label || 'unknown',
        value: rec.amount,
        fill:
          categories.find((e) => e.id === rec.categoryId)?.color ||
          generateColor({ lightness: 0.75, darkness: 0.7 }),
      },
    ];
  }, []);

const reduceTransactionsToWeekChartData = ({
  transactions,
  type,
  startDay,
}: {
  transactions: ITransaction[];
  type: 'income' | 'expense';
  startDay: string;
}) => {
  const weekArray = [];
  for (let i = 0, day = new Date(startDay).getDay(); i < 7; i += 1) {
    const id = (day + i) % 7;
    weekArray.push({ id, name: getDayName(id), [type]: 0 });
  }
  return transactions
    .filter((rec) => rec.amount > 0 === (type === 'income'))
    .reduce(
      (acc: IAreaDiagramDataRecord[], rec) => {
        const recordDay = new Date(rec.date).getDay();
        const currentRec = acc.find((el) => el.id === recordDay) || {
          id: recordDay,
          name: getDayName(recordDay),
        };
        if (type === 'income') {
          currentRec.income = currentRec.income
            ? currentRec.income + rec.amount
            : rec.amount;
          return acc;
        }
        currentRec.expense = currentRec.expense
          ? currentRec.expense - rec.amount
          : Math.abs(rec.amount);
        return acc;
      },
      [...weekArray]
    );
};

export function ChartPanelWeekly() {
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    const { transactions, dateFrom, dateTo } = statistics;
    const weekStart = getDayAWeekAgo(new Date()).toISOString();
    const weekEnd = getDateWithDefaultTime(new Date()).toISOString();

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
        reduceTransactionsToCircleBarData({ transactions, categories })
      );
      setExpenseDiagData(
        reduceTransactionsToWeekChartData({
          transactions,
          type: 'expense',
          startDay: weekStart,
        })
      );
      setIncomeDiagData(
        reduceTransactionsToWeekChartData({
          transactions,
          type: 'income',
          startDay: weekStart,
        })
      );
    }
  }, [statistics, dispatch, categories, isFetching]);

  return (
    <RightPanel>
      <CardBox height="25%" style={{ overflow: 'hidden' }}>
        <ChartNameWithIcon color="greener" caption="Week Receipt">
          <IncomeIcon />
        </ChartNameWithIcon>
        <ExpenseIncomeAreaChart data={incomeChartData} />
      </CardBox>
      <CardBox height="25%" style={{ overflow: 'hidden' }}>
        <ChartNameWithIcon color="red" caption="Week Expense">
          <ExpenseIcon />
        </ChartNameWithIcon>
        <ExpenseIncomeAreaChart data={expenseChartData} />
      </CardBox>
      <CardBox height="50%" style={{ overflow: 'hidden' }}>
        <ChartNameWithIcon color="red" caption="By Categories Per Week">
          <ChartIcon />
        </ChartNameWithIcon>
        <RadialBarDiagram data={circleDiagData} />
      </CardBox>
    </RightPanel>
  );
}
