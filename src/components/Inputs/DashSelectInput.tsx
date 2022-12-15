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
    borderBottom: `1px solid${theme.palette.primary.light}`,
  },
}));

export function DashSelectInput({
  id,
  width = 'auto',
  grow = '0',
  gridcol = 'span 1',
  label = '',
  ...props
}: SelectProps & {
  width?: string;
  grow?: string;
  gridcol?: string;
  label?: string;
}) {
  return (
    <StyledLabel id={`${id}-label`}>
      {label}
      <SelectInput
        {...props}
        labelId={`${id}-label`}
        style={{
          width,
          flexGrow: grow,
          gridColumn: gridcol,
        }}
        variant="standard"
        IconComponent={ExpandMore}
      />
    </StyledLabel>
  );
}
