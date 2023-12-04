import { Outlet } from 'react-router-dom'
import { ChapterLink } from '../../components/ChapterLink'

export default function ThreejsIndexPage() {
  return (
    <div>
      <h1>THREE.js</h1>
      <nav className="flex gap-2 py-8">
        <ChapterLink to="01">01</ChapterLink>
        <ChapterLink to="02">02</ChapterLink>
        <ChapterLink to="03">03</ChapterLink>
        <ChapterLink to="04">04</ChapterLink>
        <ChapterLink to="05">05</ChapterLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
