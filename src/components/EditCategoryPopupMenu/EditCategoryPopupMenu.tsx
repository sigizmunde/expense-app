import { useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { EditCategoryBoard } from '../EditCategoryBoard/EditCategoryBoard';
import { deleteCategory } from '../../store/data/dataThunk';
import { EditItemPopupMenu } from '../EditItemPopupMenu/EditItemPopupMenu';

export function EditCategoryPopupMenu({ id }: { id: number }) {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);

  const handleEditTransaction = () => {
    setEdit(true);
  };

  const handleDeleteTransaction = () => {
    dispatch(deleteCategory(id));
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
          <EditCategoryBoard id={id} afterSubmit={handleCloseModal} />
        </ModalWindow>
      )}
    </>
  );
}
