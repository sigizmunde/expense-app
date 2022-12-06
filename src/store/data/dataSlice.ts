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
import { isPendingAction, isRejectedAction } from '../actionTypeCheckers';
import {
  ICategoriesResponse,
  ICategory,
  IDataState,
  ITransaction,
  ITransactionsResponse,
} from '../../types/data';
import { store } from '../store';
import { setWarning } from '../auth/authSlice';

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
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<ICategoriesResponse>) => {
          state.categories = action.payload.categories;
          state.isFetching = false;
        }
      )
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.categories.push(action.payload);
          state.isFetching = false;
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.categories = state.categories.filter(
            (e) => e.id !== action.payload.id
          );
          state.isFetching = false;
        }
      )
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.categories = state.categories.map((e) => {
            return e.id !== action.payload.id ? e : { ...e, ...action.payload };
          });
          state.isFetching = false;
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
          state.isFetching = false;
        }
      )
      .addCase(
        addTransaction.fulfilled,
        (state, action: PayloadAction<ITransaction>) => {
          state.transactions.push(action.payload);
          state.isFetching = false;
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
          state.isFetching = false;
        }
      )
      .addCase(
        updateTransaction.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.transactions = state.transactions.map((e) => {
            return e.id !== action.payload.id ? e : { ...e, ...action.payload };
          });
          state.isFetching = false;
        }
      )
      .addCase(
        getTotalInfo.fulfilled,
        (
          state,
          action: PayloadAction<{
            totalIncome: number;
            totalExpense: number;
            totalTransactions: number;
          }>
        ) => {
          state = { ...state, ...action.payload };
          state.isFetching = false;
        }
      )
      .addMatcher(isPendingAction, (state) => {
        state.isFetching = true;
      })
      .addMatcher(isRejectedAction, (state, { payload }) => {
        state.isFetching = false;
        store.dispatch(setWarning({ message: payload.message }));
      });
  },
});
