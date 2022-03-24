import { useEffect, useRef, useState } from "react";

export const useCanvasContext = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [context, setContext] = useState<CanvasRenderingContext2D | null>();

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    setContext(ctx);
  }, [canvasRef]);

  return { canvasRef, context };
};
