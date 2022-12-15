import { useEffect } from 'react';
import { Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { authSelectors } from '../../store/auth/authSelectors';
import { resetWarning } from '../../store/auth/authSlice';
import { resetErrorMessage } from '../../store/data/dataSlice';

const StyledAlert = styled(Alert)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(5),
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 9,
}));

export function WarningDispatcher() {
  const dispatch = useAppDispatch();
  const warningMessage = useAppSelector(authSelectors.getMessage);

  let timeoutHandle: ReturnType<typeof setTimeout>;

  useEffect(() => {
    timeoutHandle = setTimeout(() => {
      dispatch(resetWarning());
      dispatch(resetErrorMessage());
    }, 2500);
  }, [warningMessage]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutHandle);
      dispatch(resetWarning());
    };
  }, [dispatch]);

  return warningMessage && warningMessage !== '' ? (
    <StyledAlert severity="warning">{warningMessage}</StyledAlert>
  ) : (
    <> </>
  );
}
