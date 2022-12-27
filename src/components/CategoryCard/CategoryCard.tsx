import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Divider, Box } from '@mui/material';
import { ICategory } from '../../types/data';
import { ColorChip } from '../ColorBadges/ColorChip';
import { getCategoryStatistics } from '../../services/getCategoryStatistics';
import { StatsBar } from '../StatsBar/StatsBar';
import { EditCategoryPopupMenu } from '../EditCategoryPopupMenu/EditCategoryPopupMenu';
import { useEffectOnce } from '../../hooks/useEffectOnce';

const CategoryBox = styled(Box)(({ theme }) => ({
  padding: 0,
  position: 'relative',
  overflow: 'auto',
  maxHeight: '100%',
  justifySelf: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'stretch',
  alignItems: 'ccenter',
  borderRadius: theme.spacing(0),
  backgroundColor: theme.palette.custom.white,
}));

const EditButtonWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(0),
  right: theme.spacing(0),
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
  height: theme.spacing(6),
  width: '100%',
  padding: `${theme.spacing(3)} ${theme.spacing(2)} 0`,
  textAlign: 'center',
  overflow: 'hidden',
}));

const StatsWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: `0 ${theme.spacing(2)} ${theme.spacing(3)}`,
  textAlign: 'center',
}));

const CategoryName = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  marginTop: theme.spacing(1),
}));

const StatsCaption = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  marginTop: theme.spacing(1),
}));

const ValueCaption = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  marginTop: 0,
}));

export function CategoryCard({ id, color, label }: ICategory) {
  const [statistics, setStatistics] = useState({});

  useEffectOnce(() => {
    getCategoryStatistics(id)
      .then((res) => {
        setStatistics(res);
      })
      .catch(({ error }) => {
        setStatistics({ error });
      });
  });

  return (
    <CategoryBox>
      <EditButtonWrapper>
        <EditCategoryPopupMenu id={id} />
      </EditButtonWrapper>
      <TitleWrapper>
        <ColorChip color={color || 'white'} />
        <CategoryName>{label}</CategoryName>
      </TitleWrapper>
      <Divider />
      <StatsWrapper>
        {'transactionsCount' in statistics && (
          <>
            <StatsCaption>Total Transactions</StatsCaption>
            <ValueCaption>
              {statistics.transactionsCount as string}
            </ValueCaption>
          </>
        )}
        {'error' in statistics && <div>{`Error: ${statistics.error}`}</div>}
        {'income' in statistics && 'expense' in statistics && (
          <>
            <StatsCaption>Total of Money</StatsCaption>
            <StatsBar
              income={statistics.income as number}
              expense={statistics.expense as number}
            />
          </>
        )}
      </StatsWrapper>
    </CategoryBox>
  );
}
