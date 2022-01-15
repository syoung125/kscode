import { RefObject, useEffect, useRef, useState } from "react";

type SizeType = {
  width: number | undefined;
  height: number | undefined;
};

export const useResizeDetector = <T = any>(): SizeType & {
  ref: RefObject<T>;
} => {
  const ref = useRef<T>(null);

  const [size, setSize] = useState<SizeType>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const callback: ResizeObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const { width, height } = (entry && entry.contentRect) || {};
        setSize({ width, height });
      });
    };

    const resizeObserver = new ResizeObserver(callback);
    ref.current && resizeObserver.observe(ref.current as any);
    return () => resizeObserver.disconnect();
  }, []);

  return { width: size.width, height: size.height, ref };
};
