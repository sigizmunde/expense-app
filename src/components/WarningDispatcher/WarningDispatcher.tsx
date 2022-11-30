import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Navigate, Outlet } from 'react-router-dom';
import { authSelectors } from '../../store/auth/authSelectors';
import { IRouteProps } from '../../types/utils';
import { resetWarning } from '../../store/auth/authSlice';
import { Alert } from '@mui/material';

export const PrivateRoute = ({ redirectTo = '/' }: IRouteProps) => {
  const dispatch = useAppDispatch();
  const warningMessage = useAppSelector(authSelectors.getErrorMessage);

  useEffect(() => {
    const timeoutHandle = setTimeout(() => dispatch(resetWarning()), 2000);
    return () => {
      dispatch(resetWarning()), clearTimeout(timeoutHandle);
    };
  });

  return (
    <>
      {warningMessage && warningMessage !== '' && (
        <Alert severity="warning">{warningMessage}</Alert>
      )}
    </>
  );
};
