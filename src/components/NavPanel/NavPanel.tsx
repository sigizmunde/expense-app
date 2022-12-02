import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Logo } from '../Logo/Logo';
import { MainMenu } from '../MainMenu/MainMenu';
import { UserBadge } from '../UserBadge/UserBadge';

const NavPanelBox = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '260px',
  padding: theme.spacing(5) + ' ' + theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'start',
  flexShrink: 0,
  position: 'relative',
  backgroundColor: theme.palette.custom.black,
}));

export const NavPanel = () => {
  return (
    <NavPanelBox>
      <Logo />
      <MainMenu />
      <UserBadge />
    </NavPanelBox>
  );
};
