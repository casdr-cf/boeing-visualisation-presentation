import { NavLink, NavLinkProps } from 'react-router-dom'

export function CustomNavLink(props: NavLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) => `${isActive && 'text-blue'}`}
    >
      {props.children}
    </NavLink>
  )
}
