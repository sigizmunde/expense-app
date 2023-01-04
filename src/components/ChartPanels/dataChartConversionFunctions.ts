import dayjs from 'dayjs';
import {
  IAreaDiagramDataRecord,
  ICategory,
  ICircleDiagramDataRecord,
  ITransaction,
  TPeriodType,
} from '../../types/data';
import { generateColor } from '../../utils/colorLibraryGenerator';

export const reduceTransactionsToCircleBarData = ({
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

const getTimingCell = (
  time: string,
  periodType: TPeriodType
): IAreaDiagramDataRecord => {
  switch (periodType) {
    case 'day':
      return {
        id: dayjs(time).hour(),
        name: dayjs(time).format('hh'),
      };
    case 'week':
      return {
        id: dayjs(time).day(),
        name: dayjs(time).format('ddd'),
      };
    case 'month':
      return {
        id: dayjs(time).date(),
        name: dayjs(time).format('DD'),
      };
    case 'year':
      return {
        id: dayjs(time).month(),
        name: dayjs(time).format('MMM'),
      };
    default:
      return {
        id: dayjs(time).day(),
        name: dayjs(time).format('ddd'),
      };
  }
};

const generateInitialArray = (periodType: TPeriodType, startDate: string) => {
  switch (periodType) {
    case 'day':
      return Array.from({ length: 25 }, (_, i) => {
        const hour = dayjs(startDate).add(i, 'hour');
        return {
          id: hour.hour(),
          name: hour.format('hh'),
          expense: 0,
          income: 0,
        };
      });
    case 'week':
      return Array.from({ length: 7 }, (_, i) => {
        const day = dayjs(startDate || null).add(i, 'day');
        return {
          id: day.day(),
          name: day.format('ddd'),
          expense: 0,
          income: 0,
        };
      });
    case 'month':
      return Array.from(
        { length: dayjs(startDate || null).daysInMonth() },
        (_, i) => {
          const date = dayjs().add(i, 'day');
          return {
            id: date.date(),
            name: date.format('DD'),
            expense: 0,
            income: 0,
          };
        }
      );
    case 'year':
      return Array.from({ length: 12 }, (_, i) => {
        const month = dayjs().add(i, 'month');
        return {
          id: month.month(),
          name: month.format('MMM'),
          expense: 0,
          income: 0,
        };
      });
    default:
      return [];
  }
};

export const reduceTransactionsToAreaChartData = ({
  transactions,
  type,
  startDate,
  periodType,
}: {
  transactions: ITransaction[];
  type: 'income' | 'expense';
  startDate: string;
  periodType: TPeriodType;
}) => {
  const initialArray = generateInitialArray(periodType, startDate);
  const newData = transactions
    .filter((rec) => rec.amount > 0 === (type === 'income'))
    .reduce(
      (acc: IAreaDiagramDataRecord[], rec) => {
        const recordDateUnit = getTimingCell(rec.date, periodType);
        const currentRec = acc.find((el) => el.id === recordDateUnit.id);
        if (currentRec) {
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
        }
        if (type === 'income') recordDateUnit.income = rec.amount;
        if (type === 'expense') recordDateUnit.expense = rec.amount;
        acc.push(recordDateUnit);
        return acc;
      },
      [...initialArray]
    );
  return newData;
};
