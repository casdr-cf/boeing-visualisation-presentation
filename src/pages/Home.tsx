import { Link } from 'react-router-dom'
import { ChapterLink } from '../components/ChapterLink'

export default function Home() {
  return (
    <>
      <div className="mb-4">
        <Link to="/threejs">THREE.js</Link>
        <div className="flex gap-2">
          <ChapterLink to="/threejs/01">01</ChapterLink>
          <ChapterLink to="/threejs/02">02</ChapterLink>
          <ChapterLink to="/threejs/03">03</ChapterLink>
          <ChapterLink to="/threejs/04">04</ChapterLink>
          <ChapterLink to="/threejs/05">05</ChapterLink>
        </div>
      </div>

      <div className="mb-4">
        <Link to="/gsap">GSAP</Link>
        <div className="flex gap-2">
          <ChapterLink to="/gsap/01">01</ChapterLink>
        </div>
      </div>
    </>
  )
}
