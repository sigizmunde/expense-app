import axios, { AxiosError } from 'axios';
import { ITransaction } from '../types/data';
import { IFetchError } from '../types/utils';

export const getCategoryStatistics = async (id: number) => {
  try {
    const queryString = `?categoryId[equals]=${id}`;
    const { data } = await axios.get(`/transactions${queryString}`);
    if (data?.content?.length > 0) {
      const { income, expense } = data.content.reduce(
        (acc: { income: number; expense: number }, e: ITransaction) => {
          if (e.amount < 0) acc.expense += e.amount;
          if (e.amount > 0) acc.income += e.amount;
          return acc;
        },
        { income: 0, expense: 0 }
      );
      const transactionsCount = data.content.length;
      return {
        income,
        expense,
        transactionsCount,
      };
    }
    return {
      income: 0,
      expense: 0,
      transactionsCount: 0,
    };
  } catch (err) {
    const error = err as AxiosError<IFetchError>;
    return { error: error.message };
  }
};
