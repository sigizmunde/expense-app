import { ColorSwatch } from './ColorSwatch';

export function ColorChip({ color }: { color: string }) {
  return (
    <ColorSwatch
      color={color}
      sx={(theme) => ({
        width: `calc(${theme.spacing(2)}*2.5)`,
        height: `calc(${theme.spacing(2)}*2.5)`,
        borderRadius: '50%',
        margin: `0 ${theme.spacing(0)}`,
      })}
    />
  );
}
