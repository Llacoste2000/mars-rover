import React, { forwardRef } from "react";

const Canvas = forwardRef<
  HTMLCanvasElement,
  React.CanvasHTMLAttributes<HTMLCanvasElement>
>((props, ref) => {
  return <canvas ref={ref} {...props} />;
});

export default Canvas;
