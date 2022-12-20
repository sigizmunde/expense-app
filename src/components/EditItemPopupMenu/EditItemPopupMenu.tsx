import { useState } from 'react';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/material';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';

const MenuBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export function EditItemPopupMenu({
  id,
  onEditItem,
  onDeleteItem,
}: {
  id: number;
  onEditItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [deleting, setDeleting] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditItem = () => {
    onEditItem(id);
    setAnchorEl(null);
  };

  const handleDeleteItem = () => {
    onDeleteItem(id);
    setAnchorEl(null);
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
          <ButtonSecondary colorversion="green" onClick={handleEditItem}>
            Edit
          </ButtonSecondary>
          <ButtonSecondary colorversion="red" onClick={handleStartDelete}>
            Delete
          </ButtonSecondary>
        </MenuBox>
      </Popover>

      {deleting && (
        <ConfirmDialog
          open={deleting}
          title="Delete item"
          content="Confirm you are sure to delete this item"
          confirm="Delete"
          reject="Cancel"
          onClose={handleCloseDelete}
          onConfirm={handleDeleteItem}
        />
      )}
    </div>
  );
}
