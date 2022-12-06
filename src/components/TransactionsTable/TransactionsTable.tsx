import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { dataSelectors } from '../../store/data/dataSelectors';

export const TransactionTable: FC = () => {
  const transactions = useAppSelector(dataSelectors.getTransactions);
  return (
    <>
      {transactions &&
        transactions.map((e) => (
          <div
            style={{ width: '100%', display: 'flex', gap: '24px' }}
            key={e.id}
          >
            <div>{e.id}</div>
            <div>{e.categoryId}</div>
            <div>{e.label}</div>
            <div>{e.date.slice(0, 10)}</div>
            <div>{e.amount}</div>
          </div>
        ))}
    </>
  );
};
