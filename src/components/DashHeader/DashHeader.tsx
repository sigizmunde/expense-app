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
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  justifyContent: 'space-between',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    position: 'absolute',
    top: theme.spacing(3),
    left: '50%',
    transform: 'translate(-48%, 0)',
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      transform: 'translate(-50%, 0) scale(90%)',
      gridAutoFlow: 'dense',
      gridTemplateColumns: 'repeat(2, 1fr)',
      marginLeft: theme.spacing(2),
    },
  },
}));

export function DashHeader() {
  const { totalIncome, totalExpense, totalTransactions } = useAppSelector(
    dataSelectors.getTotalInfo
  );

  return (
    <DashHeaderPanel>
      <InfoCard
        color="greener"
        caption="Total Receipt"
        value={moneyNumToString({ amount: totalIncome, currencySign: '$' })}
      >
        <IncomeIcon />
      </InfoCard>
      <InfoCard
        color="orange"
        caption="Total Expense"
        value={moneyNumToString({
          amount: totalExpense,
          currencySign: '$',
          negative: true,
        })}
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
}
