import { useState } from 'react';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/system';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { deleteTransaction } from '../../store/data/dataThunk';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { EditTransactionBoard } from '../EditTransactionBoard/EditTransactionBoard';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';

const MenuBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const TransactionPopover = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [edit, setEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditTransaction = () => {
    setEdit(true);
    setAnchorEl(null);
  };

  const handleDeleteTransaction = () => {
    dispatch(deleteTransaction(id));
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setEdit(false);
  };

  const handleStartDelete = () => {
    setDeleting(true);
  };

  const handleCloseDelete = () => {
    setDeleting(false);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'transaction-menu' : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuBox>
          <ButtonSecondary colorversion="green" onClick={handleEditTransaction}>
            Edit
          </ButtonSecondary>
          <ButtonSecondary colorversion="red" onClick={handleStartDelete}>
            Delete
          </ButtonSecondary>
        </MenuBox>
      </Popover>
      {edit && (
        <ModalWindow open={edit} onClose={handleCloseModal}>
          <EditTransactionBoard id={id} afterSubmit={handleCloseModal} />
        </ModalWindow>
      )}
      {deleting && (
        <ConfirmDialog
          open={deleting}
          title="Delete transaction"
          content="Confirm you are sure to delete this transaction"
          confirm="Delete"
          reject="Cancel"
          onClose={handleCloseDelete}
          onConfirm={handleDeleteTransaction}
        />
      )}
    </div>
  );
};
