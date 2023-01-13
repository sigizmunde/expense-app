import { styled } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';

interface ICustomProps {
  radius?: string;
  bgcolor?: string;
}

export const CardBox = styled(Box)<ICustomProps & BoxProps>(
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
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  })
);
