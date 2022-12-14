import { FC } from 'react';
import { ColorSwatch } from './ColorSwatch';

export const ColorChip: FC<{ color: string }> = ({ color }) => {
  return (
    <ColorSwatch
      color={color}
      sx={(theme) => ({
        width: theme.spacing(5),
        height: theme.spacing(5),
        borderRadius: '50%',
        margin: `0 ${theme.spacing(0)}`,
      })}
    />
  );
};
