import { Action, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { getUser } from '../auth/authThunk';
import { getTransactions } from './dataThunk';

export const dataGetTransactionsMiddleware: Middleware =
  (store: MiddlewareAPI<any>) =>
  (next: Dispatch<Action>) =>
  (action: Action) => {
    if (action.type === getUser.fulfilled.type) {
      store.dispatch(getTransactions());
    }
    next(action);
  };
