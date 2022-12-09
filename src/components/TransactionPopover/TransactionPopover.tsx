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
import { TransactionForm } from '../Forms/TransactionForm';
import { EditTransactionBoard } from '../EditTransactionBoard/EditTransactionBoard';

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
  };

  const handleCloseModal = () => {
    setEdit(false);
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
          <ButtonSecondary colorversion="red" onClick={handleDeleteTransaction}>
            Delete
          </ButtonSecondary>
        </MenuBox>
      </Popover>
      {edit && (
        <ModalWindow open={edit} onClose={handleCloseModal}>
          <EditTransactionBoard id={id} afterSubmit={handleCloseModal} />
        </ModalWindow>
      )}
    </div>
  );
};
