import { Action, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { getUser, logInUser, refreshUser } from './authThunk';

export const authGetUserMiddleware: Middleware =
  (store: MiddlewareAPI<any>) =>
  (next: Dispatch<Action>) =>
  (action: Action) => {
    if (
      action.type === refreshUser.fulfilled ||
      action.type === logInUser.fulfilled
    ) {
      store.dispatch(getUser());
    }
    next(action);
  };
