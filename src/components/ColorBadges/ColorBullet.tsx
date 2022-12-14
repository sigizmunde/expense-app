import { FC } from 'react';
import { ColorSwatch } from './ColorSwatch';

export const ColorBullet: FC<{ color: string }> = ({ color }) => {
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
};
