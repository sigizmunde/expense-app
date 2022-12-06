import { styled } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';

interface IProps {
  radius?: string;
  bgcolor?: string;
}

export const CardBox = styled(Box)<IProps & BoxProps>(
  ({ theme, ...props }) => ({
    borderRadius: props.radius || theme.spacing(0),
    backgroundColor: props.bgcolor || theme.palette.custom.white,
    justifySelf: 'stretch',
  })
);
