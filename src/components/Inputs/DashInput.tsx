import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const Input = styled(TextField)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginTop: 0,
  height: 'auto',
  '& .MuiInputAdornment-root .MuiTypography-root': {
    ...theme.typography.h5,
  },
  ' &.Mui-disabled': {
    opacity: 0.3,
  },
  '& .MuiInputBase-root::after': {
    borderBottom: 'none',
  },
  '&:focus-within .MuiInputBase-root::after': {
    borderBottom: `1px solid ${theme.palette.primary.light}`,
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
  '& .MuiInput-input': {
    ...theme.typography.h5,
    backgroundColor: 'transparent',
  },
  '& .MuiFormHelperText-root, & .Mui-error .MuiFormHelperText-root': {
    fontSize: theme.typography.subtitle2.fontSize,
  },
}));

export function DashInput({
  width = 'auto',
  grow = '0',
  gridcol = 'span 1',
  ...props
}: TextFieldProps & { width?: string; grow?: string; gridcol?: string }) {
  return (
    <Input
      {...props}
      style={{
        width,
        flexGrow: grow,
        gridColumn: gridcol,
      }}
      variant="standard"
      InputLabelProps={{ shrink: true }}
    />
  );
}
