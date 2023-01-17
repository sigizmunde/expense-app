import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const FormBox = styled(Box)(({ theme }) => ({
  width: '330px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    paddingTop: `calc(${theme.spacing(5)} + 16px)`,
    width: '100%',
    maxWidth: '360px',
  },
}));

export const FieldsBox = styled(Box)(({ theme }) => ({
  width: '100%',
  '& > *:not(:first-of-type)': {
    marginTop: theme.spacing(3),
  },
}));
