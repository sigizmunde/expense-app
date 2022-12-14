import { ReactNode } from 'react';

export interface IFetchError {
  status?: number;
  statusCode?: number;
  message: string;
  error: string;
}

export interface IRouteProps {
  redirectTo: string;
  restricted?: boolean;
  children?: ReactNode;
}

export interface IItem {
  id: string;
  text: string;
}

export interface IProps {
  items: IItem[];
}
