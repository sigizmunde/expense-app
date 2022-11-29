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
        I have an account.{' '}
        <NestedLink href={process.env.PUBLIC_URL + '/auth/signin'}>
          Go to Sign in
        </NestedLink>
      </FormSubtitle>
    </>
  );
};
