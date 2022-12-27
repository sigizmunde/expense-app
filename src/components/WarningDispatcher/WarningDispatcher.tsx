import Snackbar from '@mui/material/Snackbar';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { uixSelectors } from '../../store/uix/uixSelectors';
import { resetMessage } from '../../store/uix/uixSlice';
import { StyledAlert } from './WarningDispatcher.styled';

export function WarningDispatcher() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const message = useAppSelector(uixSelectors.getMessage);

  useEffect(() => {
    setOpen(!!message.text && message.text !== '');
    // dispatch(resetMessage);
    return function Cleanup() {
      dispatch(resetMessage);
    };
  }, [message.text, dispatch]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {message.text && message.text !== '' && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <StyledAlert severity={message.type}>{message.text}</StyledAlert>
        </Snackbar>
      )}{' '}
    </>
  );
}
