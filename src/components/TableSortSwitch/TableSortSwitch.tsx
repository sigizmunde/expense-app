import { styled, TableSortLabelProps, TableSortLabel } from '@mui/material';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.secondary.main,
  '& .MuiTableSortLabel-icon': {
    fill: theme.palette.secondary.main,
    opacity: 0.3,
  },
  iconDirectionDesc: {
    icon: {
      transform: 'rotate(0)',
    },
  },
  iconDirectionAsc: {
    icon: {
      transform: 'rotate(180)',
    },
  },
  active: {
    icon: {
      opacity: 1,
    },
  },
}));

export function TableSortSwitch(props: TableSortLabelProps) {
  return (
    <StyledTableSortLabel
      IconComponent={ArrowDropDown}
      hideSortIcon={false}
      {...props}
    />
  );
}
