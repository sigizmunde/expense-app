import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { MainContainer } from '../../components/Containers/MainContainer';
import { NavPanel } from '../../components/NavPanel/NavPanel';

export const Main: FC = () => {
  return (
    <MainContainer>
      <NavPanel />
      <Outlet />
    </MainContainer>
  );
};
