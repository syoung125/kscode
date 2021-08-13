import { useState, useEffect, MouseEventHandler } from "react";

export type Coordinate = { x: number; y: number };
// eslint-disable-next-line no-unused-vars
export type OnDrag = (movement: Coordinate) => void;

export const useDrag = (onDrag: OnDrag) => {
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState<Coordinate>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onDrag({ x: e.clientX - start.x, y: e.clientY - start.y });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setStart({ x: 0, y: 0 });
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    // 주의 : onDrag가 dependencies 배열에 들어가면 오작동한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, start]);

  const startDrag: MouseEventHandler = (e) => {
    setIsDragging(true);
    setStart({ x: e.clientX, y: e.clientY });
  };

  return { isDragging, startDrag };
};
