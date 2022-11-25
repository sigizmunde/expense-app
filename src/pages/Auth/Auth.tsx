import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthBox } from '../../components/Containers/AuthBox';
import { AuthContainer } from '../../components/Containers/AuthContainer';
import { PhotoBox } from '../../components/Containers/PhotoBox';
import { Logo } from '../../components/Logo/Logo';
import Image from '../../images/auth_back.jpg';

export const Auth: FC = () => {
  return (
    <AuthContainer>
      <AuthBox>
        <Logo />
        <Outlet />
      </AuthBox>
      <PhotoBox style={{ backgroundImage: `url(${Image})` }}></PhotoBox>{' '}
    </AuthContainer>
  );
};
