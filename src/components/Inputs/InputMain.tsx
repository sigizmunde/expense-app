import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const Input = styled(TextField)(({ theme }) => ({
  width: '100%',
  color: theme.palette.primary.contrastText,
  '& label, &:hover label, &:focus-within label': {
    opacity: 0.7,
    ...theme.typography.body1,
    color: theme.palette.primary.contrastText,
  },
  '& input': {
    marginBottom: 5,
    marginTop: 5,
    opacity: 0.7,
    ...theme.typography.body2,
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
  '& .MuiFormHelperText-root': {
    ...theme.typography.subtitle2,
    color: 'none',
    position: 'absolute',
    top: '100%',
  },
}));

export function InputMain(props: TextFieldProps) {
  return (
    <Input {...props} variant="standard" InputLabelProps={{ shrink: true }} />
  );
}
