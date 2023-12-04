import { ButtonHTMLAttributes, forwardRef } from 'react'

export const CustomButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function CustomButton(props, ref) {
  return (
    <button
      ref={ref}
      {...props}
      className="bg-light rounded-md border border-gray-300 px-2 py-0.5 hover:opacity-80"
      type="button"
    >
      {props.children}
    </button>
  )
})
