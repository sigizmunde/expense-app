import { IUser } from '../../types/auth';
import { RootState } from '../store';

export const authSelectors = {
  getIsLoggedIn: (state: RootState): boolean =>
    state.rootReducer.auth.isLoggedIn,
  getUser: (state: RootState): IUser | undefined => state.rootReducer.auth.user,
  getRefreshToken: (state: RootState): string | null =>
    state.rootReducer.auth.refreshToken,
  getIsRegistered: (state: RootState): boolean | undefined =>
    state.rootReducer.auth.isRegistered,
};
