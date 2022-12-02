import { Avatar, Box, IconButton, styled, Typography } from '@mui/material';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { authSelectors } from '../../store/auth/authSelectors';
import { logOutUser } from '../../store/auth/authThunk';
import { ReactComponent as LogoutIcon } from '../../images/icons/menu-logout.svg';

const UserBadgeBox = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  paddingTop: theme.spacing(2),
  width: '100%',
  maxWidth: `calc(${theme.spacing(5)}*3)`,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'nowrap',
  color: theme.palette.primary.contrastText,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '1px',
    opacity: 0.3,
    backgroundColor: theme.palette.primary.contrastText,
  },
  '& Avatar': {
    root: {
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
  '&:active': {
    opacity: 0.5,
  },
}));

const UserName = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle1,
  display: 'block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

const Icon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.custom.bgr,
  padding: 0,
  marginLeft: 'auto',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  ...theme.typography.h5,
  textAlign: 'center',
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.primary.contrastText,
  '&:hover': {
    border: '3px ' + theme.palette.primary.main,
  },
  '&:active': {
    opacity: 0.5,
  },
}));

interface IAvatarProps {
  image?: string;
  username: string;
}
const UserAvatar: FC<IAvatarProps> = (props) => {
  return (
    <>
      {props.image && <StyledAvatar src={props.image} alt={props.username} />}
      {!props.image && <StyledAvatar>{props.username}</StyledAvatar>}
    </>
  );
};

export const UserBadge: FC = () => {
  const user = useAppSelector(authSelectors.getUser);
  const dispatch = useAppDispatch();
  const username = user?.displayName || user?.username || 'Noname User';

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  const abbrName = (fullName: string): string => {
    const splitNames = fullName.trim().split(' ');
    return (
      splitNames
        .reduce((abbr, e, i) => (i <= 2 ? abbr + e.charAt(0) : abbr), '')
        .toUpperCase() || ''
    );
  };

  return (
    <UserBadgeBox>
      <UserAvatar username={abbrName(username)} />
      <UserName>{username}</UserName>
      <Icon onClick={handleLogOut}>
        <LogoutIcon />
      </Icon>
    </UserBadgeBox>
  );
};
