import { SlashIcon } from '@radix-ui/react-icons'
import { Outlet } from 'react-router-dom'
import { CustomNavLink } from './components/CustomNavLink'

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-200 px-10 text-stone-600">
      <nav className="flex py-8">
        <div className="flex-1">
          <CustomNavLink to="/">
            <SlashIcon width={20} height={20} />
          </CustomNavLink>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
