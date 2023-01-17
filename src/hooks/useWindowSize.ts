import { useState, useEffect } from 'react';

type TWidthHeight = {
  width: number | undefined;
  height: number | undefined;
};

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<TWidthHeight>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
