import { FC } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const Input = styled(TextField)(({ theme }) => ({
  width: '100%',
  color: theme.palette.primary.contrastText,
  '& input': {
    color: theme.palette.primary.contrastText,
  },
  '&:hover .MuiInput-underline:after, &:hover:not(.Mui-disabled) .MuiInput-underline:before':
    {
      borderBottomColor: theme.palette.primary.light,
    },
  '& .MuiInput-underline:before': {
    borderBottomColor: theme.palette.primary.contrastText,
  },
  '&:hover': {
    color: theme.palette.primary.light,
  },
}));

export const InputMain: FC<TextFieldProps> = (props) => {
  return (
    <Input {...props} variant="standard" InputLabelProps={{ shrink: true }} />
  );
};
