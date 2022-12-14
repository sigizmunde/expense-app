import { FC, useState, useCallback } from 'react';
import { Container, styled } from '@mui/material';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { TransactionTable } from '../TransactionsTable/TransactionsTable';
import { CardBox } from '../Containers/CardBox';
import { PanelTitle } from '../Typography/Typography';
import { SearchInput } from '../Inputs/SearchInput';
import { getTransactions } from '../../store/data/dataThunk';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { TransactionsPagination } from '../TransactionsPagination/TransactionsPagination';

const TableContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(1),
  maxHeight: '100%',
  overflow: 'auto',
}));

const FlexContainer = styled(Container)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'end',
}));

export const TransactionsBoard: FC = () => {
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((queryString: string) => {
    if (queryString !== '') {
      dispatch(getTransactions({ filter: queryString }));
    } else {
      dispatch(getTransactions({}));
    }
  }, []);

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
};
