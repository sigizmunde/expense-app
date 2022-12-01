import { FC } from 'react';
import Typography from '@mui/material/Typography';
import success from '../../images/success.svg';
import { ButtonPrimary } from '../../components/Buttons/ButtonPrimary';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { resetWarning } from '../../store/auth/authSlice';
import { FormBox } from '../../components/Forms/Form.styled';

export const Success: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goSignIn = () => {
    dispatch(resetWarning());
    navigate('/auth/signin', { replace: true });
  };

  return (
    <>
      <FormBox>
        <img src={success} alt="success illustration" />
        <Typography variant="h5">Your account successfully created</Typography>
        <ButtonPrimary type="button" onClick={goSignIn}>
          Let`s Start
        </ButtonPrimary>
      </FormBox>
    </>
  );
};
