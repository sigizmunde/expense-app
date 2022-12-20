import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Divider } from '@mui/material';
import { ICategory } from '../../types/data';
import { ColorChip } from '../ColorBadges/ColorChip';
import { CardBox } from '../Containers/CardBox';
import { getCategoryStatistics } from '../../services/getCategoryStatistics';
import { deleteCategory } from '../../store/data/dataThunk';
import { EditCategoryBoard } from '../EditCategoryBoard/EditCategoryBoard';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { useAppDispatch } from '../../hooks/reduxHooks';

const CategoryName = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
}));

export function CategoryCard({ id, color, label }: ICategory) {
  const dispatch = useAppDispatch();
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    getCategoryStatistics(id)
      .then((res) => {
        setStatistics(res);
      })
      .catch(({ error }) => {
        setStatistics({ error });
      });
  }, [id]);

  const [edit, setEdit] = useState<number | null>(null);

  const handleDeleteCategory = (deleteId: number) => {
    dispatch(deleteCategory(deleteId));
  };

  const handleEditCategory = (editId: number) => {
    setEdit(editId);
  };

  const handleClose = () => {
    setEdit(null);
  };

  return (
    <CardBox>
      <ColorChip color={color || 'white'} />
      <CategoryName>{label}</CategoryName>
      <Divider />
      {'error' in statistics && <div>{`Error: ${statistics.error}`}</div>}
      {'income' in statistics && <div>{`Income ${statistics.income}`}</div>}
      {'expense' in statistics && <div>{`Expense ${statistics.expense}`}</div>}
      {'transactionsCount' in statistics && (
        <div>{`Total ${statistics.transactionsCount} transactions`}</div>
      )}
      <div style={{ marginLeft: 'auto' }}>
        <button type="button" onClick={() => handleEditCategory(id)}>
          Edit
        </button>
      </div>
      <div>
        <button type="button" onClick={() => handleDeleteCategory(id)}>
          Delete
        </button>
      </div>
      {edit && (
        <ModalWindow open={edit !== null} onClose={handleClose}>
          <EditCategoryBoard id={edit} afterSubmit={handleClose} />
        </ModalWindow>
      )}
    </CardBox>
  );
}
