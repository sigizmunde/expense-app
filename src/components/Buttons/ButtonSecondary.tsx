import { styled } from '@mui/material/styles';
import { ButtonPrimary } from './ButtonPrimary';

export const ButtonSecondary = styled(ButtonPrimary)<{ colorversion?: string }>(
  ({ theme, colorversion }) => {
    const colorV = colorversion
      ? theme.palette.custom[colorversion] || 'inherit'
      : theme.palette.custom.black;
    return {
      height: '33px',
      '&, &:hover, &:focus': {
        backgroundColor: colorV,
      },
      '&:hover, &:focus': {
        opacity: '70%',
      },
      '&:disabled': {
        opacity: 1,
      },
    };
  }
);
