import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { authSelectors } from '../../store/auth/authSelectors';
import { IRouteProps } from '../../types/utils';

export function PrivateRoute({ redirectTo = '/' }: IRouteProps) {
  const isLoggedIn = useAppSelector(authSelectors.getIsLoggedIn);
  const isFetching = useAppSelector(authSelectors.getIsFetching);
  const shouldRedirect = !isLoggedIn && !isFetching;
  return shouldRedirect ? <Navigate to={redirectTo} /> : <Outlet />;
}
