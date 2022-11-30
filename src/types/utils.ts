import { ReactNode } from 'react';

export interface IValidationError {
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
