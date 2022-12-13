import { FC } from 'react';
import { Modal, ModalProps } from '@mui/material';
import { Box, styled } from '@mui/system';

const CenteredModal = styled(Modal)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ModalContainer = styled(Box)(({ theme }) => ({
  maxWidth: `calc(${theme.spacing(5)}*8)`,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.custom.bgr,
}));

export const ModalWindow: FC<ModalProps> = ({ children, onClose, open }) => {
  return (
    <CenteredModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer>{children}</ModalContainer>
    </CenteredModal>
  );
};
