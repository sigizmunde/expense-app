import { Modal, ModalProps, Box, styled } from '@mui/material';

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

export function ModalWindow({ children, onClose, open }: ModalProps) {
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
}
