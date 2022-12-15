import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthBox } from '../../components/Containers/AuthBox';
import { AuthContainer } from '../../components/Containers/AuthContainer';
import { PhotoBox } from '../../components/Containers/PhotoBox';
import { Loader } from '../../components/Loader/Loader';
import { WarningDispatcher } from '../../components/WarningDispatcher/WarningDispatcher';
import { Logo } from '../../components/Logo/Logo';
import image from '../../images/auth_back.jpg';

export const Auth: FC = () => {
  return (
    <AuthContainer>
      <AuthBox>
        <Logo />
        <Outlet />
        <Loader />
        <WarningDispatcher />
      </AuthBox>
      <PhotoBox style={{ backgroundImage: `url(${image})` }} />
    </AuthContainer>
  );
};
