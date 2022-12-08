import { FC, useState, useCallback } from 'react';
import { Container, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { TransactionTable } from '../TransactionsTable/TransactionsTable';
import { CardBox } from '../Containers/CardBox';
import { PanelTitle } from '../Typography/Typography';
import { SearchInput } from '../Inputs/SearchInput';
import { getTransactions } from '../../store/data/dataThunk';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

const TableContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(1),
  maxHeight: '100%',
  overflow: 'auto',
}));

const FlexContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'end',
}));

export const TransactionsBoard: FC = () => {
  const dispatch = useAppDispatch();
  const { totalIncome, totalExpense, totalTransactions } = useAppSelector(
    dataSelectors.getTotalInfo
  );

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((queryString: string) => {
    if (queryString !== '') {
      dispatch(getTransactions({ filter: queryString }));
      console.log(queryString);
    } else {
      dispatch(getTransactions({}));
    }
  }, []);

  useEnhancedEffect(() => {
    const timer = setTimeout(() => handleSearch(searchQuery.trim()), 2000);
    return () => clearTimeout(timer);
  }, [handleSearch, searchQuery]);

  return (
    <CardBox gridColumn="span 7">
      <FlexContainer>
        <PanelTitle>All Transactions</PanelTitle>
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          //   onBlur={handleSearch}
        />
      </FlexContainer>
      <TableContainer>
        <TransactionTable />
      </TableContainer>
    </CardBox>
  );
};
