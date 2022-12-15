import { TextFieldProps } from '@mui/material/TextField';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import PhotoIcon from '@mui/icons-material/WallpaperOutlined';

const Input = styled(TextField)(({ theme, ...props }) => ({
  gridColumn: 'span 2',
  width: '100%',
  color: theme.palette.secondary.main,
  marginBottom: `calc(${theme.spacing(0)} * -1)`,
  '& .MuiFormLabel-root': {
    ...theme.typography.h5,
  },
  '& .MuiInputBase-input, & .MuiInputBase-input[disabled], &:focus-within .MuiInputBase-input':
    {
      opacity: 0,
    },
  '& input, &:focus-within input': {
    ...theme.typography.subtitle1,
    color: theme.palette.secondary.main,
    opacity: 0.7,
  },
  '&:focus-within': {
    '& legend': {
      display: 'none',
    },
    '& .MuiFormLabel-root': {
      display: 'none',
    },
  },
  ' & .Mui-disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
  },
  '& .MuiButtonBase-root': {
    display: props.value !== '' ? 'none' : 'initial',
    color: theme.palette.secondary.main,
    opacity: 0.7,
    padding: 0,
    position: 'absolute',
    left: 0,
  },
  '& .Mui-error button': {
    color: theme.palette.error.main,
  },
}));

export function FileUploadInput(props: TextFieldProps) {
  return (
    <Input
      {...props}
      variant="outlined"
      type="file"
      inputProps={{
        accept: 'image/png, image/jpeg',
      }}
      autoComplete="off"
      // eslint-disable-next-line react/jsx-no-duplicate-props
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <PhotoIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
