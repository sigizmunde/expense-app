import { useState, useCallback } from 'react';
import { Container, styled } from '@mui/material';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { TransactionTable } from '../TransactionsTable/TransactionsTable';
import { CardBox } from '../Containers/CardBox';
import { PanelTitle } from '../Typography/Typography';
import { SearchInput } from '../Inputs/SearchInput';
import { getTransactions } from '../../store/data/dataThunk';
import { TransactionsPagination } from '../TransactionsPagination/TransactionsPagination';

const TableContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(1),
  maxHeight: '100%',
  overflow: 'auto',
}));

const FlexContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'end',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export function TransactionsBoard() {
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(
    (queryString: string) => {
      if (queryString !== '') {
        dispatch(getTransactions({ filter: queryString }));
      } else {
        dispatch(getTransactions({}));
      }
    },
    [dispatch]
  );

  useEnhancedEffect(() => {
    const timer = setTimeout(() => handleSearch(searchQuery.trim()), 1000);
    return () => clearTimeout(timer);
  }, [handleSearch, searchQuery]);

  return (
    <CardBox gridColumn="span 7">
      <FlexContainer>
        <PanelTitle>All Transactions</PanelTitle>
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </FlexContainer>
      <TableContainer>
        <TransactionTable />
      </TableContainer>
      <TransactionsPagination />
    </CardBox>
  );
}
