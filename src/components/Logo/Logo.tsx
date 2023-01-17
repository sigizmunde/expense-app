import { styled } from '@mui/material/styles';
import logo from '../../images/company_logo.svg';

const Img = styled('img')(({ theme }) => ({
  display: 'block',
  position: 'absolute',
  left: '60px',
  top: '48px',
  [theme.breakpoints.down('sm')]: {
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
}));

export function Logo() {
  return <Img src={logo} alt="app logo" />;
}
