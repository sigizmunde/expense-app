import { RootState } from '../store';

export const authSelectors = {
  getIsFetching: (state: RootState) => state.rootReducer.auth.isFetching,
  getIsLoggedIn: (state: RootState) => state.rootReducer.auth.isLoggedIn,
  getMessage: (state: RootState) => state.rootReducer.auth.message,
  getUser: (state: RootState) => state.rootReducer.auth.user,
  getRefreshToken: (state: RootState) => state.rootReducer.auth.refreshToken,
};
