import { FC } from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { theme } from '../../styles/theme';

const Button = styled(MuiButton)`
  height: 44px;
  width: 100%;
  border-radius: 2px;
  ${theme.typography.h5}
  text-transform: none;
  &:disabled {
    color: ${theme.palette.primary.contrastText};
    background-color: ${theme.palette.custom.disabled};
    opacity: 0.5;
  }
  &:hover,
  &:active {
    box-shadow: none;
  }
`;

export const ButtonPrimary: FC<ButtonProps> = (props) => {
  return (
    <Button variant="contained" {...props}>
      {props.children}
    </Button>
  );
};
