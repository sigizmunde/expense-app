import { FC } from 'react';
import logo from '../../images/company_logo.svg';
import { styled } from '@mui/material/styles';

const Img = styled('img')`
  display: block;
  position: absolute;
  left: 60px;
  top: 48px;
`;

export const Logo: FC = () => {
  return <Img src={logo} alt="app logo" />;
};
