import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';

import TableBody from '@mui/material/TableBody';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from './TransactionsTable.styled';
import { moneyNumToString } from '../../utils/moneyNumToString';
import { theme } from '../../styles/theme';
import { getTransactions } from '../../store/data/dataThunk';
import { TableSortSwitch } from '../TableSortSwitch/TableSortSwitch';
import { TransactionCategory } from '../TransactionCategory/TransactionCategory';
import { TransactionPopover } from '../TransactionPopover/TransactionPopover';
import { IPagination } from '../../types/data';
import { IProps } from '../../types/utils';

export const TransactionTable: FC = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(dataSelectors.getTransactions);
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

  const swapPagination = (pagination: IPagination) => {
    const swappedPagination = { ...pagination };
    if (pagination && pagination.totalPages)
      swappedPagination.page =
        pagination?.totalPages - 1 - (pagination?.page || 0);
    return swappedPagination;
  };

  const changeOrder = (keyToChange: string): void => {
    if (sort) {
      let newPagination: Record<string, unknown> | null = {};
      const newSort = sort.map((e: { [key: string]: string }) => {
        if (keyToChange in e) {
          const value =
            typeof e === 'object' && e[keyToChange] === 'asc' ? 'desc' : 'asc';
          newPagination = pagination && swapPagination(pagination);
          return { ...e, [keyToChange]: value };
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
          <StyledTableCell>
            Date
            {sort && valueInSort('date') && (
              <TableSortSwitch
                direction={valueInSort('date') === 'asc' ? 'asc' : 'desc'}
                onClick={() => changeOrder('date')}
              />
            )}
          </StyledTableCell>
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
              <TransactionCategory categoryId={row.categoryId} />
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
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'end',
                alignItems: 'center',
              }}
            >
              {moneyNumToString(row.amount, '$')}
              <TransactionPopover id={row.id} />
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};
