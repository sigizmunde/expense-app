import { Box, IconButton, styled } from '@mui/material';
import { Logo } from '../Logo/Logo';
import { MainMenu } from '../MainMenu/MainMenu';
import { UserBadge } from '../UserBadge/UserBadge';
import { ReactComponent as ArrowDown } from '../../images/icons/chevron-down.svg';

const NavPanelBox = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '260px',
  padding: `${theme.spacing(5)} ${theme.spacing(3)}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'start',
  flexShrink: 0,
  position: 'relative',
  backgroundColor: theme.palette.custom.black,
  [theme.breakpoints.down('lg')]: {
    position: 'fixed',
    left: '-235px',
    zIndex: 5,
    transition: 'all 250ms ease-out',
    '& .right-arrow': { transform: 'rotate(-90deg)', fill: 'currentColor' },
    '&:hover, &:focus-within': {
      left: 0,
    },
  },
}));

const OpenButton = styled(IconButton)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(5),
  borderRadius: theme.spacing(2),
  position: 'absolute',
  top: theme.spacing(6),
  right: 0,
  transform: 'translateX(50%)',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.custom.black,
  '&:hover': { backgroundColor: theme.palette.custom.black },
  display: 'none',
  [theme.breakpoints.down('lg')]: {
    display: 'block',
  },
}));

const Placeholder = styled(Box)(({ theme }) => ({
  width: 0,
  [theme.breakpoints.down('lg')]: {
    width: theme.spacing(4),
  },
}));

export function NavPanel() {
  return (
    <>
      <Placeholder />
      <NavPanelBox>
        <OpenButton>
          <ArrowDown className="right-arrow" />
        </OpenButton>
        <Logo />
        <MainMenu />
        <UserBadge />
      </NavPanelBox>
    </>
  );
}
