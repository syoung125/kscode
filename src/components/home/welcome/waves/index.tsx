import { useEffect, useRef } from "react";

import { useCanvasContext, useResizeDetector } from "@src/hooks";

import { WaveGroup } from "./wave-group";

import Style from "./index.style";

export default function Waves() {
  const { canvasRef, context: ctx } = useCanvasContext();
  const { width, ref } = useResizeDetector<HTMLDivElement>();
  const requestRef = useRef<number>(0);

  const waveGroup = new WaveGroup();

  const animate = () => {
    if (!ctx || !canvasRef.current) {
      return;
    }

    ctx.clearRect(
      0,
      0,
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
    waveGroup.draw(ctx);

    requestRef.current = requestAnimationFrame(animate);
  };

  const resize = () => {
    if (!canvasRef.current || !ctx) return;

    const { clientWidth, clientHeight } = canvasRef.current;

    canvasRef.current.width = clientWidth * 2;
    canvasRef.current.height = clientHeight * 2;
    ctx.scale(2, 2);

    waveGroup.resize(clientWidth, clientHeight);
  };

  useEffect(() => {
    if (!ctx) return;

    resize();
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx]);

  useEffect(() => {
    resize();
  }, [width]);

  return (
    <Style.Wrapper ref={ref}>
      <Style.Canvas ref={canvasRef} />
    </Style.Wrapper>
  );
}
