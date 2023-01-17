import dayjs from 'dayjs';
import {
  IAreaDiagramDataRecord,
  IBarDiagramDataRecord,
  ICategory,
  ICircleDiagramDataRecord,
  IDiagramDataRecord,
  ITransaction,
  TPeriodType,
} from '../../types/data';
import { IDefaultObject } from '../../types/utils';
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
): IDiagramDataRecord => {
  switch (periodType) {
    case 'day':
      return {
        id: dayjs(time).hour(),
        name: dayjs(time).format('HH'),
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
        // attention!
        id: dayjs(time).year() * 100 + dayjs(time).month(),
        name: dayjs(time).format('MMM'),
      };
    default:
      return {
        id: dayjs(time).day(),
        name: dayjs(time).format('ddd'),
      };
  }
};

const initialAreaValue = { expense: 0, income: 0 };

const initialBarValue = { value: 0 };

const generateInitialArray = (
  periodType: TPeriodType,
  startDate: string,
  initialRecordValue: IDefaultObject
) => {
  switch (periodType) {
    case 'day':
      return Array.from({ length: 25 }, (_, i) => {
        const hour = dayjs(startDate).add(i + 1, 'hour');
        return {
          id: hour.hour(),
          name: hour.format('HH'),
          ...initialRecordValue,
        };
      });
    case 'week':
      return Array.from({ length: 7 }, (_, i) => {
        const day = dayjs(startDate).add(i + 1, 'day');
        return {
          id: day.day(),
          name: day.format('ddd'),
          ...initialRecordValue,
        };
      });
    case 'month':
      return Array.from({ length: dayjs(startDate).daysInMonth() }, (_, i) => {
        const startDateInMonth = dayjs(startDate).add(i + 1, 'day');
        return {
          id: startDateInMonth.date(),
          name: startDateInMonth.format('DD'),
          ...initialRecordValue,
        };
      });
    case 'year':
      return Array.from({ length: 12 }, (_, i) => {
        const startDateInYear = dayjs(startDate).add(i + 1, 'month');
        return {
          // attention!
          id: startDateInYear.year() * 100 + startDateInYear.month(),
          name: startDateInYear.format('MMM'),
          ...initialRecordValue,
        };
      });
    default:
      return [];
  }
};

export const reduceTransactionsToAreaChartData = ({
  transactions,
  type = undefined,
  startDate,
  periodType,
}: {
  transactions: ITransaction[];
  type?: 'income' | 'expense';
  startDate: string;
  periodType: TPeriodType;
}) => {
  const initialArray = generateInitialArray(
    periodType,
    startDate,
    initialAreaValue
  );
  const newData = transactions.reduce(
    (acc: IAreaDiagramDataRecord[], rec) => {
      const recordDateUnit = getTimingCell(rec.date, periodType);
      const currentRec = acc.find((el) => el.id === recordDateUnit.id);
      if (currentRec) {
        if ((!type || type !== 'expense') && rec.amount > 0) {
          currentRec.income = currentRec.income
            ? currentRec.income + rec.amount
            : rec.amount;
        }
        if ((!type || type !== 'income') && rec.amount < 0) {
          currentRec.expense = currentRec.expense
            ? currentRec.expense - rec.amount
            : Math.abs(rec.amount);
        }
        return acc;
      }
      if (type === 'income' && rec.amount > 0) {
        const newRecord: IAreaDiagramDataRecord = {
          ...recordDateUnit,
          income: rec.amount,
        };
        acc.push(newRecord);
      }
      if (type === 'expense' && rec.amount < 0) {
        const newRecord: IAreaDiagramDataRecord = {
          ...recordDateUnit,
          expense: rec.amount,
        };
        acc.push(newRecord);
      }
      return acc;
    },
    [...initialArray]
  );
  return newData;
};

export const reduceTransactionsToBarChartData = ({
  transactions,
  startDate,
  periodType,
}: {
  transactions: ITransaction[];
  startDate: string;
  periodType: TPeriodType;
}) => {
  const initialArray = generateInitialArray(
    periodType,
    startDate,
    initialBarValue
  );
  const newData = transactions.reduce(
    (acc: IBarDiagramDataRecord[], rec) => {
      const recordDateBar = getTimingCell(rec.date, periodType);
      const currentRec = acc.find((el) => el.id === recordDateBar.id);
      if (currentRec) {
        currentRec.value = currentRec.value ? currentRec.value + 1 : 1;
        return acc;
      }
      const newRecord: IBarDiagramDataRecord = {
        ...recordDateBar,
        value: 1,
      };
      acc.push(newRecord);
      return acc;
    },
    [...initialArray]
  );
  return newData;
};
