import { Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { LINKS } from '../../const';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { registerUser } from '../../store/auth/authThunk';
import { IAuth } from '../../types/auth';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { StyledCheckbox } from '../Checkbox/StyledCheckbox';
import { InputMain } from '../Inputs/InputMain';
import { InputPassword } from '../Inputs/InputPassword';
import { FormSubtitle, NestedLink } from '../Typography/Typography';
import { WarningDispatcher } from '../WarningDispatcher/WarningDispatcher';
import { FieldsBox, FormBox } from './Form.styled';

const validationSchema = yup.object({
  displayName: yup.string().required('Display name is required'),
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Please, confirm yor password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const [agreed, setAgreed] = useState(false);

  const toggleAgreed = () => {
    setAgreed((agreed) => !agreed);
  };

  const handleRegisterUser = (values: IAuth) => {
    values.displayName = values.displayName?.trim();
    values.username = values.username.trim();
    dispatch(registerUser(values));
  };

  const formik = useFormik({
    initialValues: {
      displayName: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: ({ username, password, displayName }) => {
      handleRegisterUser({ username, password, displayName });
    },
  });

  return (
    <div>
      <WarningDispatcher />
      <form onSubmit={formik.handleSubmit}>
        <FormBox>
          <Typography variant="h1">Sign up</Typography>
          <FieldsBox>
            <InputMain
              id="displayName"
              name="displayName"
              label="Full Name"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              error={
                formik.touched.displayName && Boolean(formik.errors.displayName)
              }
              helperText={
                formik.touched.displayName && formik.errors.displayName
              }
              autoComplete="off"
            />
            <InputMain
              id="username"
              name="username"
              label="User Name"
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
            <InputPassword
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.password && formik.errors.confirmPassword
              }
            />
            <StyledCheckbox
              control={<Checkbox checked={agreed} onChange={toggleAgreed} />}
              label={
                <FormSubtitle>
                  By creating an account you agree to{' '}
                  <NestedLink
                    href={LINKS.termsOfUse}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    the terms of use
                  </NestedLink>{' '}
                  and our{' '}
                  <NestedLink
                    href={LINKS.policy}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    privacy policy
                  </NestedLink>
                  .
                </FormSubtitle>
              }
            />
          </FieldsBox>

          <ButtonPrimary type="submit" disabled={!agreed}>
            Sign Up
          </ButtonPrimary>
        </FormBox>
      </form>
    </div>
  );
};
