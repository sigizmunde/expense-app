import { FC } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const Input = styled(TextField)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginTop: 0,
  height: 'auto',
  '& .MuiInputAdornment-root .MuiTypography-root': {
    ...theme.typography.h5,
  },
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
  '& .MuiInputBase-root::after': {
    borderBottom: 'none',
  },
  '&:focus-within .MuiInputBase-root::after': {
    borderBottom: '1px solid' + theme.palette.primary.light,
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
  '& .MuiInput-input': {
    ...theme.typography.h5,
    backgroundColor: 'transparent',
  },
  '& .MuiFormHelperText-root, & .Mui-error .MuiFormHelperText-root': {
    fontSize: theme.typography.subtitle2.fontSize,
  },
}));

export const DashInput: FC<
  TextFieldProps & { width?: string; grow?: string; gridcol?: string }
> = (props) => {
  return (
    <Input
      {...props}
      style={{
        width: props.width,
        flexGrow: props.grow,
        gridColumn: props.gridcol,
      }}
      variant="standard"
      InputLabelProps={{ shrink: true }}
    />
  );
};
