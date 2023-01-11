import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export type TInfoCardSize = 'small' | 'medium' | 'large';

interface ICustomProps {
  // name of color in theme custom palette or hex code
  bgcolor?: string | null;
  sizetype?: TInfoCardSize;
}

const CardIcon = styled(IconButton)<ICustomProps & IconButtonProps>(
  ({ theme, ...props }) => {
    const { bgcolor, sizetype } = props;
    const color =
      bgcolor && theme.palette.custom[bgcolor] !== undefined
        ? `${theme.palette.custom[bgcolor]}26`
        : `${bgcolor || '#B2D0AD26'}`;
    // hex26 = opacity 0.015
    let diameter;
    switch (sizetype) {
      case 'small':
        diameter = theme.spacing(4);
        break;
      case 'large':
        diameter = theme.spacing(5);
        break;
      default:
        diameter = `calc(${theme.spacing(3)} * 2)`;
    }
    return {
      width: diameter,
      height: diameter,
      backgroundColor: color,
      '&:hover': {
        cursor: 'auto',
        backgroundColor: color,
      },
      '& svg': {
        maxWidth: `calc(${theme.spacing(3)} + ${theme.spacing(0)})`,
        maxHeight: `calc(${theme.spacing(3)} + ${theme.spacing(0)})`,
      },
      [`${theme.breakpoints.down('lg')} or (max-height: 875px)`]: {
        maxWidth: `calc(${theme.spacing(3)} * 2)`,
        maxHeight: `calc(${theme.spacing(3)} * 2)`,
      },
      [`${theme.breakpoints.down('md')} or (max-height: 680px)`]: {
        maxWidth: theme.spacing(4),
        maxHeight: theme.spacing(4),
      },
    };
  }
);

const CardValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  lineHeight: 1.2,
  color: theme.palette.secondary.main,
  minWidth: 0,
  maxWidth: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  [`${theme.breakpoints.down('lg')} or (max-height: 875px)`]: {
    fontSize: '20px',
  },
  [`${theme.breakpoints.down('md')} or (max-height: 680px)`]: {
    ...theme.typography.h5,
  },
}));

const CardCaption = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.secondary.main,
  opacity: 0.7,
  minWidth: 0,
  maxWidth: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

const InfoCardBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: theme.spacing(1),
  maxWidth: '100%',
}));

const InfoCardInnerBox = styled(Box)<{ sizetype: TInfoCardSize }>(
  ({ theme, sizetype }) => {
    const style = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: `0 ${theme.spacing(1)}`,
      overflow: 'hidden',
    };
    return sizetype === 'large'
      ? {
          ...style,
          flexDirection: 'column-reverse',

          [`${theme.breakpoints.down('lg')} or (max-height: 875px)`]: {
            flexDirection: 'column',
          },
          [`${theme.breakpoints.down('md')} or (max-height: 680px)`]: {
            flexDirection: 'row-reverse',
            flexWrap: 'wrap',
            justifyContent: 'start',
          },
        }
      : {
          ...style,
          flexDirection: 'column',
        };
  }
);

interface IInfoCardProps {
  color?: string;
  caption?: string;
  value?: string;
  children?: JSX.Element;
  sizetype?: TInfoCardSize;
}

export function InfoCard({
  color = undefined,
  caption = '',
  value = '',
  children = undefined,
  sizetype = 'medium',
}: IInfoCardProps) {
  return (
    <InfoCardBox>
      <CardIcon bgcolor={color || null} sizetype={sizetype}>
        {children}
      </CardIcon>
      <InfoCardInnerBox sizetype={sizetype}>
        <CardValue>{value || '---'} </CardValue>
        <CardCaption>{caption || ''}</CardCaption>
      </InfoCardInnerBox>
    </InfoCardBox>
  );
}
