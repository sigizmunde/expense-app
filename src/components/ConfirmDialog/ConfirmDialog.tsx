import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& *': {
    ...theme.typography.h5,
  },
  '& .MuiButtonBase-root': {
    '&:hover, &:focus, &:active': { color: theme.palette.primary.main },
  },
}));

interface IConfirmDialogProps extends DialogProps {
  title?: string;
  content?: string;
  confirm?: string;
  reject?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
  title,
  content,
  confirm,
  reject,
  onClose,
  onConfirm,
  ...props
}) => {
  return (
    <>
      <StyledDialog aria-labelledby="responsive-dialog-title" open={props.open}>
        {title && (
          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        )}
        {content && (
          <DialogContent>
            <DialogContentText>{content}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            {reject || 'Close'}
          </Button>
          {confirm && (
            <Button onClick={onConfirm} autoFocus>
              {confirm}
            </Button>
          )}
        </DialogActions>
      </StyledDialog>
    </>
  );
};
