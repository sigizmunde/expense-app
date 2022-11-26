export interface IUser {
  id: number;
  username: string;
  displayName: string;
  admin?: boolean;
}

export interface IAuth {
  password: string;
  username: string;
  displayName?: string;
}

export interface ILogInTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthState {
  accessToken: null | string;
  refreshToken: null | string;
  isLoggedIn: boolean;
  isFetching: boolean;
  message: string;
}
