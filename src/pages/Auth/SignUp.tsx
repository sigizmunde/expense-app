import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import {} from 'react-router-dom';
import { RegisterForm } from '../../components/Forms/RegisterForm';
import {
  FormSubtitle,
  NestedLink,
} from '../../components/Typography/Typography';
import { Success } from './Success';

export const SignUp: FC = () => {
  const message = useAppSelector((state) => state.persistedReducer.message);

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
