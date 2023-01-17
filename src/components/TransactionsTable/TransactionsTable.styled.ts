import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';

export const StyledTable = styled(Table)(() => ({
  // minWidth: 700,
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: 0,
  [`&.${tableCellClasses.head}`]: {
    ...theme.typography.subtitle2,
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.secondary,
    padding: theme.spacing(1),
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      verticalAlign: 'bottom',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    ...theme.typography.subtitle1,
    color: theme.palette.secondary,
    padding: theme.spacing(1),
    minHeight: `calc(${theme.spacing(5)} * 0.8125)`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:nth-of-type(1), &:nth-of-type(2)': {
      maxWidth: '170px',
      minWidth: '25px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    [`&.${tableCellClasses.head}, &.${tableCellClasses.body}`]: {
      paddingLeft: '2px',
      paddingRight: '2px',
      textAlign: 'center',
      '&:nth-of-type(1), &:nth-of-type(2)': { maxWidth: '75px' },
    },
  },
}));

export const StyledAmountTableCell = styled(StyledTableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    ...theme.typography.h5,
    color: theme.palette.custom.orange,
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'end',
    alignItems: 'center',
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: `${theme.palette.custom.violet}4D`,
  },
}));

export const Sorted = styled(Box)(({ theme }) => ({
  font: 'inherit',
  lineHeight: 'inherit',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
  },
}));
