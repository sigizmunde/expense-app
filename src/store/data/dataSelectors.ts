import {
  ICategory,
  IPagination,
  ITotalInfo,
  ITransaction,
  TSort,
} from '../../types/data';
import { RootState } from '../store';

export const dataSelectors = {
  getIsFetching: (state: RootState): boolean =>
    state.rootReducer.data.isFetching,
  getCategories: (state: RootState): ICategory[] =>
    state.rootReducer.data.categories,
  getTransactions: (state: RootState): ITransaction[] =>
    state.rootReducer.data.transactions,
  getPagination: (state: RootState): IPagination | null =>
    state.rootReducer.data.pagination || null,
  getTotalInfo: (state: RootState): ITotalInfo => {
    const { totalIncome, totalExpense, totalTransactions } =
      state.rootReducer.data;
    return { totalIncome, totalExpense, totalTransactions };
  },
  getSort: (state: RootState): TSort | undefined => state.rootReducer.data.sort,
};
