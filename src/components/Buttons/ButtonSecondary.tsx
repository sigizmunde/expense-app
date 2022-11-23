import { styled } from '@mui/material/styles';
import { theme } from '../../styles/theme';
import { ButtonPrimary } from './ButtonPrimary';

export const ButtonSecondary = styled(ButtonPrimary)<{ colorVersion: string }>`
  height: 33px;
  &,
  &:hover,
  &:focus {
    background-color: ${(p) =>
      p.colorVersion
        ? theme.palette.custom[p.colorVersion] || 'inherit'
        : theme.palette.custom.black};
  }
  &:hover,
  &:focus {
    opacity: 70%;
  }
  &:disabled {
    opacity: 1;
  }
`;
