import { Action, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { getUser } from '../auth/authThunk';
import {
  addTransaction,
  deleteTransaction,
  getTotalInfo,
  updateTransaction,
} from './dataThunk';

export const dataGetTotalInfoMiddleware: Middleware =
  (store: MiddlewareAPI<any>) =>
  (next: Dispatch<Action>) =>
  (action: Action) => {
    if (
      action.type === getUser.fulfilled.type ||
      action.type === addTransaction.fulfilled.type ||
      action.type === deleteTransaction.fulfilled.type ||
      action.type === updateTransaction.fulfilled.type
    ) {
      store.dispatch(getTotalInfo());
    }
    next(action);
  };
