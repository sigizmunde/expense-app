import { useEffect, useState } from 'react';
import { styled, Container } from '@mui/material';
import { ReactComponent as IncomeIcon } from '../../images/icons/income.svg';
import { ReactComponent as ExpenseIcon } from '../../images/icons/expenses.svg';
import { ReactComponent as TransactionIcon } from '../../images/icons/transaction.svg';
import { CardBox } from '../Containers/CardBox';
import { InfoCard } from '../InfoCard/InfoCard';
import { dataSelectors } from '../../store/data/dataSelectors';
import { statisticsSelectors } from '../../store/statistics/statisticsSelectors';
import { useAppSelector } from '../../hooks/reduxHooks';
import { moneyNumToString } from '../../utils/moneyNumToString';
import { PLACEHOLDER_COLOR } from '../../const';

const InfoBlockWrapper = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  alignItems: 'stretch',
  gap: theme.spacing(3),
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
}));

const InfoCardWrapper = styled(CardBox)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(2),
  justifyContent: 'center',
  alignItems: 'start',
  height: '100%',
}));

export function AnalyticsInfoBlock() {
  const categories = useAppSelector(dataSelectors.getCategories);
  const { transactions } = useAppSelector(statisticsSelectors.getStatistics);

  const [maximum, setMaximum] = useState<{
    amount: number;
    categoryName: string;
    color: string;
  }>({
    amount: 0,
    categoryName: '',
    color: PLACEHOLDER_COLOR,
  });
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    setTotalIncome(
      transactions
        .filter((t) => t.amount > 0)
        .reduce((acc, t) => {
          acc += t.amount;
          return acc;
        }, 0)
    );

    setTotalExpense(
      transactions
        .filter((t) => t.amount < 0)
        .reduce((acc, t) => {
          acc -= t.amount;
          return acc;
        }, 0)
    );

    setMaximum(() => {
      const maxTransaction = [...transactions].sort(
        (a, b) => Math.abs(b.amount) - Math.abs(a.amount)
      )[0];
      const category = categories.find(
        (c) => c.id === maxTransaction?.categoryId
      );
      return {
        amount: maxTransaction?.amount || 0,
        categoryName: category?.label || '',
        color: category?.color || PLACEHOLDER_COLOR,
      };
    });
  }, [transactions, categories]);

  return (
    <InfoBlockWrapper>
      <InfoCardWrapper>
        <InfoCard
          color="greener"
          sizetype="large"
          value={moneyNumToString({ amount: totalIncome })}
          caption="Income for Periud"
        >
          <IncomeIcon />
        </InfoCard>
      </InfoCardWrapper>
      <InfoCardWrapper>
        <InfoCard
          color="red"
          sizetype="large"
          value={moneyNumToString({ amount: totalExpense })}
          caption="Expense for Periud"
        >
          <ExpenseIcon />
        </InfoCard>
      </InfoCardWrapper>
      <InfoCardWrapper>
        <InfoCard
          color={maximum.color}
          sizetype="large"
          value={moneyNumToString({ amount: maximum.amount })}
          caption="Max Transaction for Periud"
        />
      </InfoCardWrapper>
      <InfoCardWrapper>
        <InfoCard
          color="violet"
          sizetype="large"
          value={transactions.length.toString()}
          caption="Total Transactions for Periud"
        >
          <TransactionIcon />
        </InfoCard>
      </InfoCardWrapper>
    </InfoBlockWrapper>
  );
}
