import { useEffect, useRef } from "react";

import { useCanvasContext } from "@src/common/hooks";

import { WaveGroup } from "./wave-group";

export default function Waves() {
  const { canvasRef, context: ctx } = useCanvasContext();
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

  /**  @TODO BugFix: canvas 사이즈 바뀔때마다 resize */
  const resize = () => {
    if (!canvasRef.current || !ctx) return;

    const stageWidth = canvasRef.current.clientWidth;
    const stageHeight = canvasRef.current.clientHeight;

    canvasRef.current.width = stageWidth * 2;
    canvasRef.current.height = stageHeight * 2;
    ctx.scale(2, 2);

    waveGroup.resize(stageWidth, stageHeight);
  };

  useEffect(() => {
    if (!ctx) return;

    resize();
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}
