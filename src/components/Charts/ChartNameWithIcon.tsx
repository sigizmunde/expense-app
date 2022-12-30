import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ICustomProps {
  bgcolor?: string | null;
}

const ChartIcon = styled(IconButton)<ICustomProps & IconButtonProps>(
  ({ theme, ...props }) => ({
    width: `calc(${theme.spacing(4)}+${theme.spacing(0)})`,
    height: `calc(${theme.spacing(4)}+${theme.spacing(0)})`,
    backgroundColor: `${theme.palette.custom[props.bgcolor || 'green']}26`,
    // hex26 = opacity 0.015
    '& svg': {
      width: 'auto',
      height: theme.spacing(2),
    },
  })
);

const ChartName = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.secondary.main,
  opacity: 0.7,
}));

const ChartNameBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

interface IChartNameProps {
  color?: string;
  caption?: string;
  children?: JSX.Element;
}

export function ChartNameWithIcon({
  color = undefined,
  caption = '',
  children = undefined,
}: IChartNameProps) {
  return (
    <ChartNameBox>
      <ChartIcon bgcolor={color || null}>{children}</ChartIcon>
      <ChartName>{caption || ''}</ChartName>
    </ChartNameBox>
  );
}
