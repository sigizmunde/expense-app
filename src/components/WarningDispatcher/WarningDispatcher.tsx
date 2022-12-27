import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { uixSelectors } from '../../store/uix/uixSelectors';
import { resetMessage } from '../../store/uix/uixSlice';
import { StyledAlert } from './WarningDispatcher.styled';

export function WarningDispatcher() {
  const dispatch = useAppDispatch();
  const message = useAppSelector(uixSelectors.getMessage);

  const timeoutHandle: ReturnType<typeof setTimeout> = setTimeout(() => {
    dispatch(resetMessage());
  }, 2500);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutHandle);
      dispatch(resetMessage());
    };
  }, [dispatch, timeoutHandle]);

  return message.text && message.text !== '' ? (
    <StyledAlert severity="warning">{message.text}</StyledAlert>
  ) : (
    <> </>
  );
}
