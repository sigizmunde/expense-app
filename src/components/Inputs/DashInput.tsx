import { FC } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const Input = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.secondary.main,
  marginTop: 0,
  '& MuiTextField-root': {
    marginTop: 0,
  },
  '& input, &:focus-within input': {
    marginBottom: 5,
    marginTop: 5,
    ...theme.typography.h5,
    color: theme.palette.secondary.main,
    opacity: 0.8,
  },
  ' &.Mui-disabled': {
    opacity: 0.3,
  },
  '& .MuiInputBase-root::after, &:focus-within .MuiInputBase-root::after': {
    borderBottom: 'none',
  },
  '& .MuiButtonBase-root': {
    color: theme.palette.secondary.main,
    opacity: 0.7,
    padding: 0,
    position: 'absolute',
    left: 0,
  },
  '& .Mui-error button': {
    color: theme.palette.error.main,
  },
  '& .MuiSelect-nativeInput, &:focus-within .MuiSelect-nativeInput': {
    opacity: 0,
  },
  '& .MuiInput-input:focus': {
    ...theme.typography.h5,
    backgroundColor: 'transparent',
  },
}));

export const DashInput: FC<
  TextFieldProps & { width?: string; grow?: string }
> = (props) => {
  return (
    <Input
      {...props}
      style={{ width: props.width, flexGrow: props.grow }}
      variant="standard"
      InputLabelProps={{ shrink: true }}
    />
  );
};
