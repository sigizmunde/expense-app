import { Box, styled, Typography } from '@mui/material';
import { moneyNumToString } from '../../utils/moneyNumToString';
import { PRECISION } from './settings';

const StatsBarContainer = styled(Box)(({ theme }) => ({
  margin: `${theme.spacing(1)} 0 0`,
  padding: 0,
  width: '100%',
  height: 'auto',
  display: 'grid',
  gridTemplateColumns: '(1fr 1fr)',
  gap: theme.spacing(1),
}));

const BarContainer = styled(Box)(({ theme }) => ({
  StatsBarContainermargin: 0,
  padding: 0,
  width: '100%',
  height: theme.spacing(1),
  gridColumn: 'span 2',
  display: 'grid',
  gridTemplateColumns: `repeat(${PRECISION}, 1fr)`,
  gap: 0,
  overflow: 'hidden',
  borderRadius: theme.spacing(0),
  backgroundColor: theme.palette.custom.bgr,
}));

const ColorBar = styled(Box)(() => ({
  margin: 0,
  padding: 0,
  height: '100%',
}));

const IncomeBar = styled(ColorBar)(({ theme }) => ({
  backgroundColor: theme.palette.custom.greener,
}));

const ExpenseBar = styled(ColorBar)(({ theme }) => ({
  backgroundColor: theme.palette.custom.orange,
}));

const CaptionIncome = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  textAlign: 'start',
}));

const CaptionExpense = styled(CaptionIncome)(() => ({
  textAlign: 'end',
}));

interface IStatsBarProps {
  income: number;
  expense: number;
}

export function StatsBar({ income, expense }: IStatsBarProps) {
  const incomePc = income
    ? Math.round((income / (income + Math.abs(expense))) * PRECISION)
    : 0;
  const expensePc = expense
    ? Math.round((expense / (income + Math.abs(expense))) * PRECISION) * -1
    : 0;
  return (
    <StatsBarContainer>
      <BarContainer>
        {incomePc !== 0 && (
          <IncomeBar style={{ gridColumn: `span ${incomePc}` }} />
        )}
        {expensePc !== 0 && (
          <ExpenseBar style={{ gridColumn: `span ${expensePc}` }} />
        )}
      </BarContainer>
      <CaptionIncome>{moneyNumToString({ amount: income })}</CaptionIncome>
      <CaptionExpense>
        {moneyNumToString({ amount: expense, negative: true })}
      </CaptionExpense>
    </StatsBarContainer>
  );
}
