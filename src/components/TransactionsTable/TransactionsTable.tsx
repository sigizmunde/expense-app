import { FC, useState } from 'react';
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

export const TransactionTable: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(dataSelectors.getCategories);
  const transactions = useAppSelector(dataSelectors.getTransactions);

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

  const changeOrder = (keyToChange: string): void => {
    if (sort) {
      const newSort = sort.map((e: { [key: string]: string }) => {
        if (keyToChange in e) {
          const value =
            typeof e === 'object' && e[keyToChange] === 'asc' ? 'desc' : 'asc';
          return { ...e, [keyToChange]: value };
        }
        return e;
      });
      dispatch(getTransactions({ sort: newSort }));
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
