import { Action, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { getUser } from '../auth/authThunk';
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from './dataThunk';

export const dataGetTransactionsMiddleware: Middleware =
  (store: MiddlewareAPI<any>) =>
  (next: Dispatch<Action>) =>
  (action: Action) => {
    if (
      action.type === getUser.fulfilled.type ||
      action.type === addTransaction.fulfilled.type ||
      action.type === deleteTransaction.fulfilled.type
    ) {
      const { pagination, sort } = store.getState().rootReducer.data;
      const { page, limit } = pagination || {
        page: -1,
        limit: 0,
      };
      store.dispatch(
        getTransactions({
          page,
          limit,
          sort,
        })
      );
    }
    next(action);
  };
