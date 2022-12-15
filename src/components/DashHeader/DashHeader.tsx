import { FC } from 'react';
import { styled } from '@mui/material';
import Container from '@mui/material/Container';
import { ReactComponent as IncomeIcon } from '../../images/icons/income.svg';
import { ReactComponent as ExpenseIcon } from '../../images/icons/expenses.svg';
import { ReactComponent as TransactionIcon } from '../../images/icons/transaction.svg';
import { InfoCard } from '../InfoCard/InfoCard';
import { useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';
import { moneyNumToString } from '../../utils/moneyNumToString';

const DashHeaderPanel = styled(Container)(({ theme }) => ({
  gridColumn: 'span 7',
  backgroundColor: 'transparent',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(3),
}));

export const DashHeader: FC = () => {
  const { totalIncome, totalExpense, totalTransactions } = useAppSelector(
    dataSelectors.getTotalInfo
  );

  return (
    <DashHeaderPanel>
      <InfoCard
        color="greener"
        caption="Total Receipt"
        value={moneyNumToString(totalIncome, '$')}
      >
        <IncomeIcon />
      </InfoCard>
      <InfoCard
        color="orange"
        caption="Total Expense"
        value={moneyNumToString(totalExpense, '$')}
      >
        <ExpenseIcon />
      </InfoCard>
      <InfoCard
        color="violet"
        caption="Total Transactions"
        value={totalTransactions.toString()}
      >
        <TransactionIcon />
      </InfoCard>
    </DashHeaderPanel>
  );
};
