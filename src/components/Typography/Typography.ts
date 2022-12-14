import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

export const FormSubtitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  ...theme.typography.subtitle2,
  color: theme.palette.custom.bgr,
  '&:first-of-type': {
    marginTop: theme.spacing(3),
  },
}));

export const CheckBoxTypo = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.custom.bgr,
  opacity: 0.8,
}));

export const NestedLink = styled(Link)(({ theme }) => ({
  variant: 'inherit',
  color: theme.palette.custom.blue,
  textDecoration: 'none',
  underline: 'none',
  opacity: 0.8,
  '&:hover': {
    opacity: 1,
  },
}));

export const PanelTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.secondary.main,
}));
