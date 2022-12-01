import { FC } from 'react';
import { AuthForm } from '../../components/Forms/AuthForm';
import {
  FormSubtitle,
  NestedLink,
} from '../../components/Typography/Typography';

export const SignIn: FC = () => {
  return (
    <>
      <AuthForm />
      <FormSubtitle>
        Don’t have account yet?{' '}
        <NestedLink href={process.env.PUBLIC_URL + '/auth/signup'}>
          New Account
        </NestedLink>
      </FormSubtitle>
      <FormSubtitle>
        Forgot your password?{' '}
        <NestedLink
          href={''}
          onClick={() => {
            alert('Haha, no such page yet!');
          }}
        >
          Reset Password?
        </NestedLink>
      </FormSubtitle>
    </>
  );
};
