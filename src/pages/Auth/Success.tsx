import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import success from '../../images/success.svg';
import { ButtonPrimary } from '../../components/Buttons/ButtonPrimary';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { resetRegistered } from '../../store/auth/authSlice';
import { FormBox } from '../../components/Forms/Form.styled';

export function Success() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goSignIn = () => {
    dispatch(resetRegistered());
    navigate('/auth/signin', { replace: true });
  };

  return (
    <FormBox>
      <img src={success} alt="success illustration" />
      <Typography variant="h5">Your account successfully created</Typography>
      <ButtonPrimary type="button" onClick={goSignIn}>
        Let`s Start
      </ButtonPrimary>
    </FormBox>
  );
}
