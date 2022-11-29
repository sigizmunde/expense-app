import { FC } from 'react';
import Typography from '@mui/material/Typography';
import success from '../../images/success.svg';
import { ButtonPrimary } from '../../components/Buttons/ButtonPrimary';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { resetWarning } from '../../store/auth/authSlice';

export const Success: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  dispatch(resetWarning());

  return (
    <>
      <img src={success} alt="success illustration" />
      <Typography variant="h5">Your account successfully created</Typography>
      <ButtonPrimary
        type="button"
        onClick={() => navigate('/auth/signup', { replace: true })}
      >
        Let`s Start
      </ButtonPrimary>
    </>
  );
};
