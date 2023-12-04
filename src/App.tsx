import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import RootLayout from './RootLayout'
import ThreejsIndexPage from './pages/threejs'
import Threejs01 from './pages/threejs/01'
import Threejs02 from './pages/threejs/02'
import Threejs03 from './pages/threejs/03'
import Threejs04 from './pages/threejs/04'
import Threejs05 from './pages/threejs/05'
import GSAPIndexPage from './pages/GSAP'
import GSAP01 from './pages/GSAP/01'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index path="/" element={<Home />} />

          <Route path="/threejs" element={<ThreejsIndexPage />}>
            <Route path="01" element={<Threejs01 />} />
            <Route path="02" element={<Threejs02 />} />
            <Route path="03" element={<Threejs03 />} />
            <Route path="04" element={<Threejs04 />} />
            <Route path="05" element={<Threejs05 />} />
          </Route>

          <Route path="/gsap" element={<GSAPIndexPage />}>
            <Route path="01" element={<GSAP01 />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
