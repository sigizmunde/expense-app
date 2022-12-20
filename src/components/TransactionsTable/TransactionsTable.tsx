import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import {
  Sorted,
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from './TransactionsTable.styled';
import { moneyNumToString } from '../../utils/moneyNumToString';
import { theme } from '../../styles/theme';
import { getTransactions } from '../../store/data/dataThunk';
import { TransactionCategory } from '../TransactionCategory/TransactionCategory';
import { TransactionPopover } from '../TransactionPopover/TransactionPopover';
import { IPagination } from '../../types/data';
import { TableSortSwitch2 } from '../TableSortSwitch2/TableSortSwitch2';
import { useGetTransactionsWithTableIndex } from '../../hooks/useGetTransactions';

export function TransactionTable() {
  const dispatch = useAppDispatch();
  const transactions = useGetTransactionsWithTableIndex();
  const pagination = useAppSelector(dataSelectors.getPagination);
  const sort = useAppSelector(dataSelectors.getSort) as {
    [key: string]: string;
  }[];

  const valueInSort = (keyToFind: string): string | undefined => {
    if (sort) {
      const obj = sort.find((e) => keyToFind in e) as { [key: string]: string };
      if (!obj) return undefined;
      return obj[keyToFind];
    }
    return undefined;
  };

  const swapPagination = (initialPagination: IPagination) => {
    const swappedPagination = { ...initialPagination };
    if (initialPagination && initialPagination.totalPages) {
      swappedPagination.page =
        initialPagination.totalPages - 1 - (initialPagination?.page || 0);
    }
    return swappedPagination;
  };

  const toggleSort = (keyToSort: string): void => {
    if (sort) {
      let newPagination: Record<string, unknown> | null = {};
      const newSort = sort.map((e: { [key: string]: string }) => {
        if (keyToSort in e) {
          const value =
            typeof e === 'object' && e[keyToSort] === 'asc' ? 'desc' : 'asc';
          newPagination = pagination && swapPagination(pagination);
          return { ...e, [keyToSort]: value };
        }
        if (!(keyToSort in e)) {
          const value = 'desc';
          newPagination = pagination && { ...pagination };
          return { ...e, [keyToSort]: value };
        }
        return e;
      });
      dispatch(getTransactions({ sort: newSort, ...newPagination }));
    }
  };

  return (
    <StyledTable stickyHeader aria-label="transactions table">
      <TableHead>
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell>Category</StyledTableCell>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell onClick={() => toggleSort('date')}>
            <Sorted>
              Date
              {sort && valueInSort('date') && (
                <TableSortSwitch2
                  direction={valueInSort('date') === 'asc' ? 'asc' : 'desc'}
                  onClick={() => toggleSort('date')}
                />
              )}
            </Sorted>
          </StyledTableCell>
          <StyledTableCell align="center">Money</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((row) => (
          <StyledTableRow key={row.id}>
            <StyledTableCell component="th" scope="row">
              {row.tableIndex}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize: '12px' }}>
              <TransactionCategory categoryId={row.categoryId} />
            </StyledTableCell>
            <StyledTableCell>{row.label}</StyledTableCell>
            <StyledTableCell style={{ fontSize: '12px' }}>
              {dayjs(row.date).format('DD/MM/YYYY')}
            </StyledTableCell>
            <StyledTableCell
              align="center"
              style={{
                ...theme.typography.h5,
                color: theme.palette.custom.orange,
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'end',
                alignItems: 'center',
              }}
            >
              {moneyNumToString({ amount: row.amount, currencySign: '$' })}
              <TransactionPopover id={row.id} />
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
}
