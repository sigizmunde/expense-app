import { useMemo } from 'react';
import { dataSelectors } from '../store/data/dataSelectors';
import { useAppSelector } from './reduxHooks';

export const useGetTransactionsWithTableIndex = () => {
  const transactions = useAppSelector(dataSelectors.getTransactions);
  const pagination = useAppSelector(dataSelectors.getPagination);
  const sort = useAppSelector(dataSelectors.getSort) as {
    [key: string]: string;
  }[];
  const backOrder =
    sort.find((e) => 'date' in e)?.['date'].toLowerCase() === 'desc';

  const transactionsRemap = useMemo(() => {
    const page = pagination?.page || 0;
    const limit = pagination?.limit || 0;
    const totalPages = pagination?.totalPages || 1;
    const totalElements = pagination?.totalElements || limit * totalPages;
    return transactions.map((e, i) => ({
      ...e,
      tableIndex: backOrder
        ? limit * (totalPages - page) - i - (limit - (totalElements % limit))
        : i + 1 + page * (pagination?.limit || 0),
    }));
  }, [transactions, pagination, backOrder]);

  return transactionsRemap;
};
