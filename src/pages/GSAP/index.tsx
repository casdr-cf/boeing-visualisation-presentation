import { Outlet } from 'react-router-dom'
import { ChapterLink } from '../../components/ChapterLink'

export default function GSAPIndexPage() {
  return (
    <div>
      <h1>GSAP</h1>
      <nav className="flex gap-2 py-8">
        <ChapterLink to="01">01</ChapterLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
