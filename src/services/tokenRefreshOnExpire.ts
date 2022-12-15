import axios, { AxiosRequestConfig } from 'axios';
import { store } from '../store/store';
import { isTokenExpired } from './isTokenExpired';
import { token } from './token';

export async function tokenRefreshOnExpire(config: AxiosRequestConfig) {
  if (config.headers && config.headers.Authorization) {
    const currentToken = (config.headers.Authorization as string).split(' ')[1];
    if (isTokenExpired(currentToken)) {
      token.unset();
      const { refreshToken } = store.getState().rootReducer.auth;
      if (refreshToken) {
        const { data } = await axios.post('/auth/refresh', {
          refreshToken,
        });
        token.set(data.accessToken);
        config.headers.Authorization = `Bearer ${data.accessToken}`;
      }
    }
  }
  return config;
}
