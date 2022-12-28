import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ColorChip } from '../ColorBadges/ColorChip';

const CardValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  lineHeight: 1,
  color: theme.palette.secondary.main,
}));

const CardCaption = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  lineHeight: 1.2,
  color: theme.palette.secondary.main,
  opacity: 0.7,
}));

const InfoCardBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
}));

interface IInfoCardProps {
  color?: string;
  name?: string;
  value?: string | number;
}

export function LegendInfoCard({
  color = '#FFF',
  name = '',
  value = 0,
}: IInfoCardProps) {
  return (
    <InfoCardBox>
      <ColorChip color={color || '#FFF'} />
      <Box>
        <CardCaption>{name || ''}</CardCaption>
        <CardValue>{value || ''} </CardValue>
      </Box>
    </InfoCardBox>
  );
}
