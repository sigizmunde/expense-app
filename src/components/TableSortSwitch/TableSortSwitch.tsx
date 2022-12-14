import { styled, TableSortLabelProps } from '@mui/material';
import { TableSortLabel } from '@mui/material';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { FC } from 'react';

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
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

export const TableSortSwitch: FC<TableSortLabelProps> = (props) => {
  return (
    <StyledTableSortLabel
      IconComponent={ArrowDropDown}
      hideSortIcon={false}
      {...props}
    />
  );
};
