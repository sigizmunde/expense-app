import { Outlet } from 'react-router-dom';
import { MainContainer } from '../../components/Containers/MainContainer';
import { Loader } from '../../components/Loader/Loader';
import { WarningDispatcher } from '../../components/WarningDispatcher/WarningDispatcher';
import { NavPanel } from '../../components/NavPanel/NavPanel';

export function Main() {
  return (
    <MainContainer>
      <NavPanel />
      <Outlet />
      <Loader />
      <WarningDispatcher />
    </MainContainer>
  );
}
