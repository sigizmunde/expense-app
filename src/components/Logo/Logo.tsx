import { styled } from '@mui/material/styles';
import logo from '../../images/company_logo.svg';

const Img = styled('img')`
  display: block;
  position: absolute;
  left: 60px;
  top: 48px;
`;

export function Logo() {
  return <Img src={logo} alt="app logo" />;
}
