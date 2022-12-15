import { styled, Box, BoxProps } from '@mui/material';

const Swatch = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  width: theme.spacing(5),
  height: theme.spacing(3),
}));

export function ColorSwatch({ color, ...props }: BoxProps & { color: string }) {
  return (
    <Swatch component="span" style={{ backgroundColor: color }} {...props} />
  );
}
