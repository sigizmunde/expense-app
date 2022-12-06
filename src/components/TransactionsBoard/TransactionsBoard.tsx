import { FC } from 'react';
import { Container, styled } from '@mui/material';
import { useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { moneyNumToString } from '../../utils/moneyNumToString';
import { TransactionTable } from '../TransactionsTable/TransactionsTable';
import { CardBox } from '../Containers/CardBox';
import { PanelTitle } from '../Typography/Typography';

const TableContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(1),
  maxHeight: '100%',
  overflow: 'auto',
}));

export const TransactionsBoard: FC = () => {
  const { totalIncome, totalExpense, totalTransactions } = useAppSelector(
    dataSelectors.getTotalInfo
  );

  return (
    <CardBox>
      <PanelTitle>All Transactions</PanelTitle>
      <TableContainer>
        <TransactionTable />
      </TableContainer>
    </CardBox>
  );
};
