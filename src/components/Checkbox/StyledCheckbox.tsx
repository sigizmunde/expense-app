import { FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCheckbox = styled(FormControlLabel)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  width: '100%',
  margin: 0,
  marginTop: theme.spacing(1),
  '& input': {
    position: 'relative',
    zIndex: 0,
    '&:checked': {
      opacity: 1,
      color: theme.palette.primary.main,
      '& + svg path': {
        fill: 'currentColor',
        opacity: 1,
      },
    },
    '& + svg path': {
      fill: theme.palette.primary.contrastText,
      opacity: 0.8,
    },
    '&::after': {
      content: '" "',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 0,
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
  '& svg': {
    position: 'absolute',
    zIndex: 0,
    fill: 'currentColor',
    '& path': { fill: 'currentColor' },
  },
  '& .MuiTypography-root:first-of-type': {
    marginTop: 0,
    opacity: 0.8,
    '&:hover, &:active': {
      opacity: 1,
    },
  },
}));
