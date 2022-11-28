import { Action, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { getUser, logInUser, refreshUser } from './authThunk';

export const authGetUserMiddleware: Middleware =
  (store: MiddlewareAPI<any>) =>
  (next: Dispatch<Action>) =>
  (action: Action) => {
    console.log('hello there!');
    if (
      action.type === refreshUser.fulfilled.type ||
      action.type === logInUser.fulfilled.type
    ) {
      console.log('getting user');
      store.dispatch(getUser());
    }
    next(action);
  };
