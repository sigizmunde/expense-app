import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ButtonPrimary } from '../../components/Buttons/ButtonPrimary';

export const Main: FC = () => {
  return (
    <div>
      Main container
      <Outlet />
    </div>
  );
};
