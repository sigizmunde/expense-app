import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { MainContainer } from '../../components/Containers/MainContainer';
import { NavPanel } from '../../components/Containers/NavPanel';
import { Logo } from '../../components/Logo/Logo';
import { MainMenu } from '../../components/MainMenu/MainMenu';

export const Main: FC = () => {
  return (
    <MainContainer>
      <NavPanel>
        <Logo />
        <MainMenu />
      </NavPanel>
      <Outlet />
    </MainContainer>
  );
};
