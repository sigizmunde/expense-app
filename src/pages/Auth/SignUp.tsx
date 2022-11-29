import { FC, useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../components/Forms/RegisterForm';
import {
  FormSubtitle,
  NestedLink,
} from '../../components/Typography/Typography';

export const SignUp: FC = () => {
  const navigate = useNavigate();

  const message = useAppSelector((state) => state.persistedReducer.message);

  useEffect(() => {
    if (message === 'success') {
      navigate('/auth/success', { replace: true });
    }
  }, [message, navigate]);

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
