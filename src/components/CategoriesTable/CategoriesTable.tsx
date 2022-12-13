import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { deleteCategory } from '../../store/data/dataThunk';
import { EditCategoryBoard } from '../EditCategoryBoard/EditCategoryBoard';
import { ModalWindow } from '../ModalWindow/ModalWindow';

export const CategoriesTable: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(dataSelectors.getCategories);
  const [edit, setEdit] = useState<number | null>(null);

  const handleDeleteCategory = (id: number) => {
    dispatch(deleteCategory(id));
  };

  const handleEditCategory = (id: number) => {
    setEdit(id);
  };

  const handleClose = () => {
    setEdit(null);
  };

  return (
    <>
      {categories &&
        categories.map((e) => (
          <div
            style={{ width: '100%', display: 'flex', gap: '24px' }}
            key={e.id}
          >
            <div>{e.id}</div>
            <div>{e.label}</div>
            <div style={{ marginLeft: 'auto' }}>
              <button type="button" onClick={() => handleEditCategory(e.id)}>
                Edit
              </button>
            </div>
            <div>
              <button type="button" onClick={() => handleDeleteCategory(e.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      {edit && (
        <ModalWindow open={edit !== null} onClose={handleClose}>
          <EditCategoryBoard id={edit} afterSubmit={handleClose} />
        </ModalWindow>
      )}
    </>
  );
};
