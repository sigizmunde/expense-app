import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addCategory,
  addTransaction,
  deleteCategory,
  deleteTransaction,
  getCategories,
  getTotalInfo,
  getTransactions,
  updateCategory,
  updateTransaction,
} from './dataThunk';
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '../actionTypeCheckers';
import {
  ICategoriesResponse,
  ICategory,
  IDataState,
  ITotalInfo,
  ITransaction,
  ITransactionsResponse,
} from '../../types/data';

const initialState: IDataState = {
  categories: [],
  transactions: [],
  pagination: {
    page: -1,
    skip: 0,
    limit: 0,
    totalPages: 0,
    totalElements: 0,
  },
  sort: [{}],
  filter: {},
  totalIncome: 0,
  totalExpense: 0,
  totalTransactions: 0,
  isFetching: false,
  errorMessage: null,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetErrorMessage: (state) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<ICategoriesResponse>) => {
          state.categories = action.payload.categories;
        }
      )
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.categories.push(action.payload);
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.categories = state.categories.filter(
            (e) => e.id !== action.payload.id
          );
        }
      )
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.categories = state.categories.map((e) => {
            return e.id !== action.payload.id ? e : { ...e, ...action.payload };
          });
        }
      )
      .addCase(
        getTransactions.fulfilled,
        (state, action: PayloadAction<ITransactionsResponse>) => {
          const { transactions, pagination, sort, filter } = action.payload;
          state.transactions = transactions;
          state.pagination = pagination;
          state.sort = sort;
          state.filter = filter;
        }
      )
      .addCase(
        addTransaction.fulfilled,
        (state, action: PayloadAction<ITransaction>) => {
          state.transactions.unshift(action.payload);
        }
      )
      .addCase(
        deleteTransaction.fulfilled,
        (
          state,
          action: PayloadAction<{ id: number; label: string; userId: number }>
        ) => {
          state.transactions = state.transactions.filter(
            (e) => e.id !== action.payload.id
          );
        }
      )
      .addCase(
        updateTransaction.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.transactions = state.transactions.map((e) => {
            return e.id !== action.payload.id ? e : { ...e, ...action.payload };
          });
        }
      )
      .addCase(
        getTotalInfo.fulfilled,
        (state, action: PayloadAction<ITotalInfo>) => {
          Object.assign(state, action.payload);
        }
      )
      .addMatcher(isFulfilledAction, (state) => {
        state.isFetching = false;
      })
      .addMatcher(isPendingAction, (state) => {
        state.isFetching = true;
      })
      .addMatcher(isRejectedAction, (state, { payload }) => {
        state.isFetching = false;
        state.errorMessage = payload.message;
      });
  },
});

export const { resetErrorMessage } = dataSlice.actions;
