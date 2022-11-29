import { FC, useState } from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { InputMain } from './InputMain';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';

const Input = styled(InputMain)(({ theme }) => ({
  '& .MuiButtonBase-root': {
    color: theme.palette.primary.contrastText,
  },
  '& .Mui-error button': {
    color: theme.palette.error.main,
  },
}));

export const InputPassword: FC<TextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Input
      {...props}
      variant="standard"
      id="standard-adornment-password"
      type={showPassword ? 'text' : 'password'}
      autoComplete="off"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
