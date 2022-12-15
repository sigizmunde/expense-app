import { IUser } from '../../types/auth';
import { RootState } from '../store';

export const authSelectors = {
  getIsFetching: (state: RootState): boolean =>
    state.rootReducer.auth.isFetching,
  getIsLoggedIn: (state: RootState): boolean =>
    state.rootReducer.auth.isLoggedIn,
  getMessage: (state: RootState): string => state.rootReducer.auth.message,
  getUser: (state: RootState): IUser | undefined => state.rootReducer.auth.user,
  getRefreshToken: (state: RootState): string | null =>
    state.rootReducer.auth.refreshToken,
};
