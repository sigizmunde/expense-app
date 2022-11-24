import { FC } from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Button = styled(MuiButton)(({ theme }) => ({
  height: '44px',
  width: '100%',
  borderRadius: '2px',
  ...theme.typography.h5,
  textTransform: 'none',
  '&:disabled': {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.custom.disabled,
    opacity: 0.5,
  },
  '&, &:hover, &:active': {
    boxShadow: 'none',
  },
}));

export const ButtonPrimary: FC<ButtonProps> = (props) => {
  return (
    <Button variant="contained" {...props}>
      {props.children}
    </Button>
  );
};
