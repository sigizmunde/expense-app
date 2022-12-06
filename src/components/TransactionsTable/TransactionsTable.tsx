import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { moneyNumToString } from '../../utils/moneyNumToString';
import { theme } from '../../styles/theme';
import { getTransactions } from '../../store/data/dataThunk';
import { TableContainer } from '@mui/material';

const StyledTable = styled(Table)(({ theme }) => ({
  // minWidth: 700,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: 0,
  [`&.${tableCellClasses.head}`]: {
    ...theme.typography.subtitle2,
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.secondary,
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
    // borderTop: '2px ' + theme.palette.primary.contrastText + ' solid',
  },
  [`&.${tableCellClasses.body}`]: {
    ...theme.typography.subtitle1,
    color: theme.palette.secondary,
    minHeight: `calc(${theme.spacing(5)} * 0.8125)`,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.custom.violet + '4D',
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const TransactionTable: FC = () => {
  const dispatch = useAppDispatch();
  // dispatch(getTransactions({}));
  const categories = useAppSelector(dataSelectors.getCategories);
  const transactions = useAppSelector(dataSelectors.getTransactions);

  return (
    <StyledTable stickyHeader aria-label="transactions table">
      <TableHead>
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell>Category</StyledTableCell>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>Date</StyledTableCell>
          <StyledTableCell align="center">Money</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((row) => (
          <StyledTableRow key={row.id}>
            <StyledTableCell component="th" scope="row">
              {row.id}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize: '12px' }}>
              {categories.find(({ id }) => id === row.categoryId)?.label ||
                'unknown'}
            </StyledTableCell>
            <StyledTableCell>{row.label}</StyledTableCell>
            <StyledTableCell style={{ fontSize: '12px' }}>
              {row.date.slice(0, 10)}
            </StyledTableCell>
            <StyledTableCell
              align="center"
              style={{
                ...theme.typography.h5,
                color: theme.palette.custom.orange,
              }}
            >
              {moneyNumToString(row.amount, '$')}
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};
