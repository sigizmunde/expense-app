import { Action, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { getUser } from '../auth/authThunk';
import { getCategories } from './dataThunk';

export const dataGetCategoriesMiddleware: Middleware =
  (store: MiddlewareAPI<any>) =>
  (next: Dispatch<Action>) =>
  (action: Action) => {
    if (action.type === getUser.fulfilled.type) {
      store.dispatch(getCategories());
    }
    next(action);
  };
