import { FC } from 'react';
import { styled } from '@mui/material';
import { Box, BoxProps } from '@mui/system';

const Swatch = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  width: theme.spacing(5),
  height: theme.spacing(3),
}));

export const ColorSwatch: FC<BoxProps & { color: string }> = ({
  color,
  ...props
}) => {
  return (
    <Swatch component="span" style={{ backgroundColor: color }} {...props} />
  );
};
