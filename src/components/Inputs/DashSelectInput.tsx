import { FC } from 'react';
import Select, { SelectProps } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import ExpandMore from '@mui/icons-material/ExpandMore';

const StyledLabel = styled(InputLabel)(({ theme }) => ({
  ...theme.typography.subtitle1,
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
}));

const SelectInput = styled(Select)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginTop: 0,
  height: 'auto',
  '& .MuiInput-input': {
    ...theme.typography.h5,
    backgroundColor: 'transparent',
  },
  '&.MuiInputBase-root::after': {
    borderBottom: '1px solid' + theme.palette.primary.light,
  },
}));

export const DashSelectInput: FC<
  SelectProps & {
    width?: string;
    grow?: string;
    gridcol?: string;
    label?: string;
  }
> = (props) => {
  return (
    <>
      <StyledLabel id={`${props.id}-label`}>
        {props.label}
        <SelectInput
          {...props}
          labelId={`${props.id}-label`}
          style={{
            width: props.width,
            flexGrow: props.grow,
            gridColumn: props.gridcol,
          }}
          variant="standard"
          IconComponent={ExpandMore}
        />
      </StyledLabel>
    </>
  );
};
