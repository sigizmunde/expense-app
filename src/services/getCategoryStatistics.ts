import axios, { AxiosError } from 'axios';
import { store } from '../store/store';
import { decreaseIsFetching, increaseIsFetching } from '../store/uix/uixSlice';
import { ITransaction } from '../types/data';
import { IFetchError } from '../types/utils';

export const getCategoryStatistics = async (id: number) => {
  try {
    store.dispatch(increaseIsFetching());
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
      store.dispatch(decreaseIsFetching());
      return {
        income,
        expense,
        transactionsCount,
      };
    }
    store.dispatch(decreaseIsFetching());
    return {
      income: 0,
      expense: 0,
      transactionsCount: 0,
    };
  } catch (err) {
    store.dispatch(decreaseIsFetching());
    const error = err as AxiosError<IFetchError>;
    return { error: error.message };
  }
};
