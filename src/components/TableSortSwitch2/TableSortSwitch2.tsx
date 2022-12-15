import { styled, TableSortLabelProps, Typography } from '@mui/material';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  color: 'inherit',
  font: 'inherit',
  lineHeight: 'inherit',
  margin: theme.spacing(0),
  transform: 'translateY(10%)',
}));

const AscIcon = styled(ArrowDropUp)(({ theme, ...props }) => ({
  margin: 0,
  marginRight: `calc(-1*${theme.spacing(0)})`,
  color: 'inherit',
  opacity:
    typeof props.direction === 'string' &&
    props.direction?.toLowerCase() === 'asc'
      ? 1
      : 0.3,
  '& .MuiSvgIcon-root': {
    margin: 0,
  },
}));

const DescIcon = styled(ArrowDropDown)(({ theme, ...props }) => ({
  margin: 0,
  marginLeft: `calc(-1*${theme.spacing(0)})`,
  color: 'inherit',
  opacity:
    typeof props.direction === 'string' &&
    props.direction?.toLowerCase() === 'desc'
      ? 1
      : 0.3,
}));

export function TableSortSwitch2({ direction }: TableSortLabelProps) {
  return (
    <StyledTypography>
      <AscIcon direction={direction} />
      <DescIcon direction={direction} />
    </StyledTypography>
  );
}
