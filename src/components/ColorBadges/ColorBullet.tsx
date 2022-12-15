import { ColorSwatch } from './ColorSwatch';

export function ColorBullet({ color }: { color: string }) {
  return (
    <ColorSwatch
      color={color}
      sx={(theme) => ({
        width: theme.spacing(2),
        height: theme.spacing(2),
        borderRadius: '50%',
        transform: 'translateY(15%)',
        margin: `0 ${theme.spacing(0)}`,
      })}
    />
  );
}
