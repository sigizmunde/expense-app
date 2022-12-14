import { FC, useState, useEffect } from 'react';
import { ICategory } from '../../types/data';
import { ColorChip } from '../ColorBadges/ColorChip';
import { CardBox } from '../Containers/CardBox';
import { styled } from '@mui/material/styles';
import { Typography, Divider } from '@mui/material';
import { getCategoryStatistics } from '../../services/getCategoryStatistics';
import { deleteCategory } from '../../store/data/dataThunk';
import { EditCategoryBoard } from '../EditCategoryBoard/EditCategoryBoard';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { useAppDispatch } from '../../hooks/reduxHooks';

const CategoryName = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
}));

export const CategoryCard: FC<ICategory> = (props) => {
  const dispatch = useAppDispatch();
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    getCategoryStatistics(props.id)
      .then((res) => {
        setStatistics(res);
      })
      .catch(({ error }) => {
        setStatistics({ error });
      });
  }, []);

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
    <CardBox>
      <ColorChip color={props.color || 'white'} />
      <CategoryName>{props.label}</CategoryName>
      <Divider />
      {'error' in statistics && <div>{'Error: ' + statistics.error}</div>}
      {'income' in statistics && <div>{'Income ' + statistics.income}</div>}
      {'expense' in statistics && <div>{'Expense ' + statistics.expense}</div>}
      {'transactionsCount' in statistics && (
        <div>{'Total ' + statistics.transactionsCount + ' transactions'}</div>
      )}
      <div style={{ marginLeft: 'auto' }}>
        <button type="button" onClick={() => handleEditCategory(props.id)}>
          Edit
        </button>
      </div>
      <div>
        <button type="button" onClick={() => handleDeleteCategory(props.id)}>
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
};
