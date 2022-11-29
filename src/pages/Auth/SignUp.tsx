import { FC } from 'react';
import { RegisterForm } from '../../components/Forms/RegisterForm';
import {
  FormSubtitle,
  NestedLink,
} from '../../components/Typography/Typography';

export const SignUp: FC = () => {
  return (
    <>
      <RegisterForm />
      <FormSubtitle>
        Don’t have account yet?{' '}
        <NestedLink href={process.env.PUBLIC_URL + '/auth/signup'}>
          New Account
        </NestedLink>
      </FormSubtitle>
    </>
  );
};
