import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ICustomProps {
  bgcolor?: string | null;
}

const CardIcon = styled(IconButton)<ICustomProps & IconButtonProps>(
  ({ theme, ...props }) => ({
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: `${theme.palette.custom[props.bgcolor || 'green']}26`,
    // hex26 = opacity 0.015
  })
);

const CardValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
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

interface IInfoCardProps {
  color?: string;
  caption?: string;
  value?: string;
  children?: JSX.Element;
}

export function InfoCard({
  color = undefined,
  caption = '',
  value = '',
  children = undefined,
}: IInfoCardProps) {
  return (
    <InfoCardBox>
      <CardIcon bgcolor={color || null}>{children}</CardIcon>
      <Box>
        <CardValue>{value || '---'} </CardValue>
        <CardCaption>{caption || ''}</CardCaption>
      </Box>
    </InfoCardBox>
  );
}
