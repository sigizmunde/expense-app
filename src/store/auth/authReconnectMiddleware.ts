import { Action, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { logInUser, refreshUser } from './authThunk';

interface ActionWithToken extends Action {
  payload: {
    refreshToken: string | null;
  };
}

export const authReconnectMiddleware: Middleware =
  (store: MiddlewareAPI<any>) =>
  (next: Dispatch<ActionWithToken>) =>
  (action: ActionWithToken) => {
    if (
      (action.type === 'persist/REHYDRATE' && action.payload?.refreshToken) ||
      (action.type === logInUser.rejected.type && store.getState().refreshToken)
    ) {
      store.dispatch(
        refreshUser({ refreshToken: action.payload.refreshToken as string })
      );
    }
    next(action);
  };
