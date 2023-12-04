import { NavLink } from 'react-router-dom'
import { ReactNode } from 'react'

export function ChapterLink({
  to,
  children,
}: {
  to: string
  children: ReactNode
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${isActive && 'text-blue border-gray-400'}`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-inherit tabular-nums hover:bg-gray-300">
        {children}
      </span>
    </NavLink>
  )
}
