import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import { TPeriodType } from '../../types/data';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'stretch',
  width: '100%',
  gap: theme.spacing(1),
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  flexGrow: 1,
  flexShrink: 1,
  margin: 0,
  padding: `calc(${theme.spacing(0)} * 1.5)`,
  width: '100%',
  textTransform: 'capitalize',
  border: 'none',
  borderRadius: `${theme.spacing(0)}!important`,
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.primary.contrastText,
  '&.Mui-selected': {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    '&:hover, &:focus, &:active': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

interface ICalendarButtonsProps {
  value: TPeriodType;
  onChange: (e: React.MouseEvent<HTMLElement>, newValue: TPeriodType) => void;
}

export default function CalendarButtons({
  value = 'year',
  onChange,
}: ICalendarButtonsProps) {
  return (
    <StyledToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={onChange}
      aria-label="Platform"
    >
      <StyledToggleButton value="day">Day</StyledToggleButton>
      <StyledToggleButton value="week">Week</StyledToggleButton>
      <StyledToggleButton value="month">Month</StyledToggleButton>
      <StyledToggleButton value="year">Year</StyledToggleButton>
    </StyledToggleButtonGroup>
  );
}
