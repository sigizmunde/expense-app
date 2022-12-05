import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import {} from 'react-router-dom';
import { RegisterForm } from '../../components/Forms/RegisterForm';
import {
  FormSubtitle,
  NestedLink,
} from '../../components/Typography/Typography';
import { Success } from './Success';
import { authSelectors } from '../../store/auth/authSelectors';

export const SignUp: FC = () => {
  const message = useAppSelector(authSelectors.getMessage);

  return (
    <>
      {message !== 'success' && (
        <>
          <RegisterForm />
          <FormSubtitle>
            I have an account.{' '}
            <NestedLink href={process.env.PUBLIC_URL + '/auth/signin'}>
              Go to Sign in
            </NestedLink>
          </FormSubtitle>
        </>
      )}{' '}
      {message === 'success' && <Success />}
    </>
  );
};
