import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { getTransactions } from '../../store/data/dataThunk';

export function TransactionsPagination() {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(dataSelectors.getPagination);
  const sort = useAppSelector(dataSelectors.getSort);
  const page = pagination?.page || 0;
  const count = pagination?.totalPages || 1;

  const handleLoadPage = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value !== page + 1)
      dispatch(getTransactions({ page: value - 1, sort }));
  };

  return count > 1 ? (
    <Stack spacing={2} margin="auto" marginTop={1}>
      <Pagination
        count={count}
        page={page + 1}
        onChange={handleLoadPage}
        size="small"
        color="primary"
      />
    </Stack>
  ) : (
    <div />
  );
}
