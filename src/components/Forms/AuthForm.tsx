import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { logInUser } from '../../store/auth/authThunk';
import { IAuth } from '../../types/auth';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { InputMain } from '../Inputs/InputMain';
import { InputPassword } from '../Inputs/InputPassword';
import { WarningDispatcher } from '../WarningDispatcher/WarningDispatcher';
import { FieldsBox, FormBox } from './Form.styled';

const validationSchema = yup.object({
  username: yup.string().required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export const AuthForm = () => {
  const dispatch = useAppDispatch();

  const handleLoginUser = (values: IAuth) => {
    values.username = values.username.trim();
    dispatch(logInUser(values));
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLoginUser(values);
    },
  });

  return (
    <div>
      <WarningDispatcher />
      <form onSubmit={formik.handleSubmit}>
        <FormBox>
          <Typography variant="h1">Sign in</Typography>
          <FieldsBox>
            <InputMain
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              autoComplete="off"
            />
            <InputPassword
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </FieldsBox>
          <ButtonPrimary type="submit">Login</ButtonPrimary>
        </FormBox>
      </form>
    </div>
  );
};
