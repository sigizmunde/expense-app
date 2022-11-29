import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthBox } from '../../components/Containers/AuthBox';
import { AuthContainer } from '../../components/Containers/AuthContainer';
import { PhotoBox } from '../../components/Containers/PhotoBox';
import { Logo } from '../../components/Logo/Logo';
import { useAppDispatch } from '../../hooks/reduxHooks';
import Image from '../../images/auth_back.jpg';
import { logInUser, registerUser } from '../../store/auth/authThunk';

export const Auth: FC = () => {
  const dispatch = useAppDispatch();

  const handleRegisterUser = () => {
    dispatch(
      logInUser({
        username: 'BenNoone',
        password: 'Password1234',
      })
    );
  };

  return (
    <AuthContainer>
      <AuthBox>
        <Logo />
        <button type="button" onClick={handleRegisterUser}>
          dispatch!
        </button>
        <Outlet />
      </AuthBox>
      <PhotoBox style={{ backgroundImage: `url(${Image})` }}></PhotoBox>{' '}
    </AuthContainer>
  );
};
