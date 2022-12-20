import { styled } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';

interface IProps {
  radius?: string;
  bgcolor?: string;
}

export const CardBox = styled(Box)<IProps & BoxProps>(
  ({ theme, ...props }) => ({
    padding: theme.spacing(3),
    position: 'relative',
    overflow: 'auto',
    maxHeight: '100%',
    justifySelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'stretch',
    borderRadius: props.radius || theme.spacing(0),
    backgroundColor:
      theme.palette.custom[props.bgcolor as string] ||
      props.bgcolor ||
      theme.palette.custom.white,
  })
);
