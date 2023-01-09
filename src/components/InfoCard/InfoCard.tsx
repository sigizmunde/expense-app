import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type TInfoCardSize = 'small' | 'medium' | 'large';

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
    };
  }
);

const CardValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  lineHeight: 1.2,
  color: theme.palette.secondary.main,
}));

const CardCaption = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.secondary.main,
  opacity: 0.7,
}));

const InfoCardBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

const InfoCardInnerBox = styled(Box)<{ sizetype: TInfoCardSize }>(
  ({ sizetype }) => {
    return sizetype === 'large'
      ? {
          display: 'flex',
          flexDirection: 'column-reverse',
          justifyContent: 'center',
          gap: 0,
        }
      : {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 0,
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
