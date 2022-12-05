import { RootState } from '../store';

export const dataSelectors = {
  getIsFetching: (state: RootState) => state.rootReducer.data.isFetching,
  getCategories: (state: RootState) => state.rootReducer.data.categories,
  getTransactions: (state: RootState) => state.rootReducer.data.transactions,
  getPagination: (state: RootState) =>
    state.rootReducer.data.pagination || null,
};
