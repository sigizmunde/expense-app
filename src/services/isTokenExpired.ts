import jwt from 'jwt-decode';
import { IProps } from '../types/utils';

export const isTokenExpired = (token: string) => {
  const { exp } = jwt(token) as { exp: number } & IProps;
  return exp && exp * 1000 < Date.now();
};
