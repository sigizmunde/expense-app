import { useAppSelector } from '../../hooks/reduxHooks';
import { RegisterForm } from '../../components/Forms/RegisterForm';
import {
  FormSubtitle,
  NestedLink,
} from '../../components/Typography/Typography';
import { Success } from './Success';
import { authSelectors } from '../../store/auth/authSelectors';

export function SignUp() {
  const isRegistered = useAppSelector(authSelectors.getIsRegistered);

  return (
    <>
      {!isRegistered && (
        <>
          <RegisterForm />
          <FormSubtitle>
            I have an account.{' '}
            <NestedLink href={`${process.env.PUBLIC_URL}/auth/signin`}>
              Go to Sign in
            </NestedLink>
          </FormSubtitle>
        </>
      )}
      {isRegistered && <Success />}
    </>
  );
}
