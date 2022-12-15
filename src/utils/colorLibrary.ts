export const generateColor = ({
  lightness = 0.8,
  darkness = 0.5,
  loop = 100,
}): string => {
  const getRand = () => Math.round(Math.random() * 255);
  const stringify = (color: { r: number; g: number; b: number }) => {
    const str = (h: number) => h.toString(16).padStart(2, '0');
    return `#${str(color.r)}${str(color.g)}${str(color.b)}`;
  };

  const { r, g, b } = { r: getRand(), g: getRand(), b: getRand() };
  if (
    ((r + g + b) / (3 * 255) < lightness &&
      (r + g + b) / (3 * 255) > darkness) ||
    loop < 1
  ) {
    return stringify({ r, g, b });
  }
  return generateColor({ lightness, darkness, loop: loop - 1 });
};

export const getLightColors = (n = 8) => {
  const colors = [];
  for (let i = 0; i < n; i += 1) {
    colors.push({
      id: i,
      color: generateColor({ lightness: 0.95, darkness: 0.7 }),
    });
  }
  return colors;
};

export const getDarkColors = (n = 8) => {
  const colors = [];
  for (let i = 0; i < n; i += 1) {
    colors.push({
      id: i,
      color: generateColor({ lightness: 0.5, darkness: 0.15 }),
    });
  }
  return colors;
};
