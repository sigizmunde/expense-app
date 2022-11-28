import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { InputMain } from '../Inputs/InputMain';
import { InputPassword } from '../Inputs/InputPassword';
import { FieldsBox, FormBox } from './AuthForm.styled';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export const AuthForm = () => {
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormBox>
          <Typography variant="h1">Sign in</Typography>
          <FieldsBox>
            <InputMain
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <InputPassword
              fullWidth
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
          <ButtonPrimary
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Submit
          </ButtonPrimary>
        </FormBox>
      </form>
    </div>
  );
};
