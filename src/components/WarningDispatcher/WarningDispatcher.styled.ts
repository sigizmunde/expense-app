import { Alert, AlertProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TMessageType } from '../../types/uix';

interface ICustomProps {
  type?: TMessageType;
}

export const StyledAlert = styled(Alert)<ICustomProps & AlertProps>(
  ({ theme, type }) => ({
    position: 'fixed',
    top: theme.spacing(5),
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9,
    backgroundColor: `${() => {
      switch (type) {
        case 'err': {
          return theme.palette.error.main;
        }
        case 'warn': {
          return theme.palette.custom.orange;
        }
        case 'info': {
          return theme.palette.custom.blue70;
        }
        case 'success': {
          return theme.palette.success.main;
        }
        default: {
          return theme.palette.custom.blue70;
        }
      }
    }}`,
  })
);
