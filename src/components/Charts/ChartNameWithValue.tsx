import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ChartNameWithIcon, IChartNameProps } from './ChartNameWithIcon';

const TitleValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  color: theme.palette.secondary.main,
  marginLeft: 'auto',
}));

const FlexBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'space-between',
  gap: theme.spacing(1),
}));

interface IChartNameWithValueProps extends IChartNameProps {
  value: string;
}

export function ChartNameWithValue({
  color = undefined,
  caption = '',
  children = undefined,
  value = '',
}: IChartNameWithValueProps) {
  return (
    <FlexBox>
      <ChartNameWithIcon color={color} caption={caption}>
        {children}
      </ChartNameWithIcon>
      <TitleValue>{value}</TitleValue>
    </FlexBox>
  );
}
