import { Navigate, Outlet } from 'react-router-dom';
import { authSelectors } from '../../store/auth/authSelectors';
import { useAppSelector } from '../../hooks/reduxHooks';
import { IRouteProps } from '../../types/utils';

export const PublicRoute = ({
  restricted = false,
  redirectTo = '/',
}: IRouteProps) => {
  const isLoggedIn = useAppSelector(authSelectors.getIsLoggedIn);

  const shouldRedirect = isLoggedIn && restricted;

  return <>{shouldRedirect ? <Navigate to={redirectTo} /> : <Outlet />}</>;
};
