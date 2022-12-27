import { useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { EditTransactionBoard } from '../EditTransactionBoard/EditTransactionBoard';
import { deleteTransaction } from '../../store/data/dataThunk';
import { EditItemPopupMenu } from '../EditItemPopupMenu/EditItemPopupMenu';

export function EditTransactionPopupMenu({ id }: { id: number }) {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);

  const handleEditTransaction = () => {
    setEdit(true);
  };

  const handleDeleteTransaction = () => {
    dispatch(deleteTransaction(id));
  };

  const handleCloseModal = () => {
    setEdit(false);
  };
  return (
    <>
      <EditItemPopupMenu
        id={id}
        onEditItem={handleEditTransaction}
        onDeleteItem={handleDeleteTransaction}
      />
      {edit && (
        <ModalWindow open={edit} onClose={handleCloseModal}>
          <EditTransactionBoard id={id} afterSubmit={handleCloseModal} />
        </ModalWindow>
      )}
    </>
  );
}
