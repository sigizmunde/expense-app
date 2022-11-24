import { FC } from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Button = styled(MuiButton)(({ theme }) => ({
  height: '44px',
  width: '100%',
  'border-radius': '2px',
  ...theme.typography.h5,
  'text-transform': 'none',
  '&:disabled': {
    color: 'primary.contrastText',
    'background-color': 'custom.disabled',
    opacity: 0.5,
  },
  '&, &:hover, &:active': {
    'box-shadow': 'none',
  },
}));

export const ButtonPrimary: FC<ButtonProps> = (props) => {
  return (
    <Button variant="contained" {...props}>
      {props.children}
    </Button>
  );
};
