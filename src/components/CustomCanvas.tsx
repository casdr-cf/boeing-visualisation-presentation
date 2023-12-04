import { CanvasHTMLAttributes, forwardRef } from 'react'

export const CustomCanvas = forwardRef<
  HTMLCanvasElement,
  CanvasHTMLAttributes<HTMLCanvasElement>
>(function CustomCanvas(props, ref) {
  return (
    <canvas
      ref={ref}
      {...props}
      className="bg-light block min-h-[500px] w-full rounded-lg shadow-lg"
    ></canvas>
  )
})
