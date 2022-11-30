import { RootState } from '../store';

export const authSelectors = {
  getIsFetching: (state: RootState) => state.persistedReducer.isFetching,
  getIsLoggedIn: (state: RootState) => state.persistedReducer.isLoggedIn,
  getErrorMessage: (state: RootState) => state.persistedReducer.message,
  getUsername: (state: RootState) => state.persistedReducer.user?.username,
  getRefreshToken: (state: RootState) => state.persistedReducer.refreshToken,
};
