import { FC, useState } from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Search from '@mui/icons-material/SearchOutlined';

const Input = styled(TextField)(({ theme, ...props }) => ({
  minWidth: '180px',
  color: theme.palette.secondary.main,
  '& input, &:focus-within input': {
    marginBottom: 5,
    marginTop: 5,
    ...theme.typography.subtitle1,
    color: theme.palette.secondary.main,
    opacity: 0.7,
  },
  ' &.Mui-disabled': {
    opacity: 0.2,
  },
  '& .MuiInputBase-root::after, &:focus-within .MuiInputBase-root::after': {
    borderBottom: 'none',
  },
  '& .MuiButtonBase-root': {
    display: props.value !== '' ? 'none' : 'initial',
    color: theme.palette.secondary.main,
    opacity: 0.7,
    padding: 0,
    position: 'absolute',
    left: 0,
  },
  '&:focus-within .MuiButtonBase-root': {
    display: 'none',
  },
  '& .Mui-error button': {
    color: theme.palette.error.main,
  },
}));

export const SearchInput: FC<TextFieldProps> = (props) => {
  return (
    <Input
      {...props}
      variant="standard"
      type="text"
      autoComplete="off"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton aria-label="search icon">
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
