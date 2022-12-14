import { FC } from 'react';
import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Box } from '@mui/material';

export const MenuAppBar = styled(AppBar)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: theme.spacing(4),
  flexShrink: 0,
  width: 'auto',
  position: 'relative',
  marginTop: `calc(${theme.spacing(5)} * 3)`,
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: 'inherit',
  boxShadow: 'none',
}));

const LinkWrapper = styled(Box)(({ theme }) => ({
  '& a': {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.custom.white,
    ...theme.typography.h5,
    textDecoration: 'none',
    position: 'relative',
    opacity: 0.54,
    '&::after': {
      content: null,
      height: '1px',
      width: '100%',
      position: 'absolute',
      bottom: '-1px',
      left: 0,
      backgroundColor: theme.palette.primary.main,
    },
    '&:hover::after, &:focus::after, &:hover::after': {
      content: '" "',
    },
    '&:hover::after': {
      backgroundColor: theme.palette.primary.contrastText,
    },
    '&.active': {
      opacity: 1,
      '&::after': {
        content: '" "',
      },
    },
    '& svg': { margin: theme.spacing(0), marginLeft: 0 },
  },
}));

export const MenuLink: FC<NavLinkProps> = (props) => {
  return (
    <LinkWrapper>
      <NavLink style={{ display: 'box', textDecoration: 'none' }} {...props}>
        {props.children}
      </NavLink>
    </LinkWrapper>
  );
};
