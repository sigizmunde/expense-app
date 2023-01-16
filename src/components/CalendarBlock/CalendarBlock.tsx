import { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import { IconButton, styled } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CalendarButtons from '../CalendarButtons/CalendarButtons';
import { TPeriodType } from '../../types/data';
import { CardBox } from '../Containers/CardBox';
import { ReactComponent as CalendarIcon } from '../../images/icons/calendar.svg';
import { DashInput } from '../Inputs/DashInput';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getStatistics } from '../../store/statistics/statisticsThunk';
import { authSelectors } from '../../store/auth/authSelectors';

const FlexCalendarContainer = styled(Container)(({ theme }) => ({
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: theme.spacing(2),
}));

const CalendarTopper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  padding: `${theme.spacing(2)} ${theme.spacing(3)} 0`,
}));

const CalendarCaption = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle1,
  lineHeight: 1.12,
  marginTop: '-2px',
  color: theme.palette.secondary.main,
}));

const Icon = styled(IconButton)(({ theme }) => ({
  width: `calc(${theme.spacing(4)} + ${theme.spacing(0)})`,
  height: `calc(${theme.spacing(4)} + ${theme.spacing(0)})`,
  backgroundColor: `${theme.palette.custom.grey}B3`,
  '& svg': {
    fill: theme.palette.primary.contrastText,
    maxWidth: theme.spacing(2),
    maxHeight: theme.spacing(2),
  },
  '&:active, &:hover, &:focus': {
    backgroundColor: `${theme.palette.custom.grey}B3`,
  },
}));

const StyledDatePicker = styled(StaticDatePicker)(({ theme }) => ({
  '& .MuiCalendarPicker-root, & .MuiPickerStaticWrapper-content, & .MuiCalendarOrClockPicker-root > div':
    {
      minWidth: '240px',
      width: '100%',
    },
  '& .MuiCalendarPicker-root': { padding: theme.spacing(2) },
  '& .PrivatePickersSlideTransition-root': {
    minHeight: '12rem',
  },
  '& .MuiPickersCalendarHeader-root': {
    width: 'auto',
    padding: `0 ${theme.spacing(1)}`,
  },
  '& .MuiPickersCalendarHeader-label': {
    [theme.breakpoints.down('sm')]: {
      ...theme.typography.h5,
      lineHeight: 1.05,
    },
  },
  '& .MuiPickersDay-root, & .MuiDayPicker-header span': {
    ...theme.typography.subtitle1,
    color: undefined,
    width: `calc(${theme.spacing(3)} + ${theme.spacing(0)})`,
    height: `calc(${theme.spacing(3)} + ${theme.spacing(0)})`,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  '& .PrivatePickersYear-yearButton': {
    width: 'auto',
    margin: '1px 0',
    padding: '1px',
  },
}));

export function CalendarBlock() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(authSelectors.getIsLoggedIn);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [periodType, setPeriodType] = useState<TPeriodType>('year');
  const [pickedData, setPickedData] = useState<Dayjs | null>(
    dayjs(new Date().toLocaleDateString())
  );
  const [shownValue, setShownValue] = useState('00/00/00 to 00/00/00');

  const handlePeriodTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newPeriodType: TPeriodType
  ) => {
    setPeriodType(newPeriodType);
  };

  useEffect(() => {
    const dateFrom = dayjs(pickedData).subtract(1, periodType);

    setShownValue(
      `${dateFrom.format('DD/MM/YY')} to ${dayjs(pickedData).format(
        'DD/MM/YY'
      )}`
    );

    if (!isLoggedIn) return;

    dispatch(
      getStatistics({
        dateFrom: dateFrom.format('YYYY-MM-DD'),
        dateTo: dayjs(pickedData).format('YYYY-MM-DD'),
      })
    );
  }, [dispatch, isLoggedIn, periodType, pickedData, setShownValue]);

  return (
    <FlexCalendarContainer>
      <CalendarButtons value={periodType} onChange={handlePeriodTypeChange} />
      <CardBox style={{ padding: 0 }}>
        <CalendarTopper>
          <Icon>
            <CalendarIcon />
          </Icon>
          <Box>
            <CalendarCaption>Period</CalendarCaption>
            <DashInput
              value={shownValue}
              onFocus={(e) => {
                e.currentTarget.blur();
              }}
            />
          </Box>
        </CalendarTopper>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDatePicker
            ref={calendarRef}
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={pickedData}
            onChange={(newValue) => {
              setPickedData(newValue as Dayjs);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </CardBox>
    </FlexCalendarContainer>
  );
}
