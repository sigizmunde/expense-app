import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

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
  },
  [`&.${tableCellClasses.body}`]: {
    ...theme.typography.subtitle1,
    color: theme.palette.secondary,
    padding: theme.spacing(1),
    minHeight: `calc(${theme.spacing(5)} * 0.8125)`,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.custom.violet + '4D',
  },
}));
