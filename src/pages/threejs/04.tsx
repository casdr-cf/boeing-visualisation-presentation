import { RefObject, useEffect, useRef, useState } from 'react'
import {
  BoxGeometry,
  Clock,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'
import Stats from 'stats.js'
import { CustomCanvas } from '../../components/CustomCanvas'
import { CustomButton } from '../../components/CustomButton'

interface ThreeCanvasOptions {
  canvasRef: RefObject<HTMLCanvasElement>
  statsRef: RefObject<HTMLDivElement>
}

class ThreeCanvas {
  private scene: Scene
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer
  private width: number
  private height: number
  private grid: { x: number; y: number; mesh: Mesh }[]
  private dummyObject = new Object3D()
  private positions: Float32Array
  private mesh: InstancedMesh
  private clock: Clock
  private statsRef: HTMLDivElement
  private stats: Stats
  private RAF: number

  constructor(options: ThreeCanvasOptions) {
    const canvas = options.canvasRef.current

    if (!canvas) {
      throw new Error('Given wrapper is null, cannot setup THREE.js instance')
    }

    const { width, height } = canvas.getBoundingClientRect()
    this.width = width
    this.height = height

    this.scene = new Scene()

    this.camera = new PerspectiveCamera(60, this.width / this.height, 0.1, 100)
    this.camera.position.z = 60

    this.renderer = new WebGLRenderer({ canvas })
    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xf5f5f5)

    const geometry = new BoxGeometry(2, 2, 2)
    const material = new MeshBasicMaterial({
      color: 'blue',
      wireframe: true,
    })

    const cols = 100
    const rows = 44
    this.grid = []

    const instanceCount = cols * rows

    this.mesh = new InstancedMesh(geometry, material, instanceCount)
    this.scene.add(this.mesh)

    this.positions = new Float32Array(instanceCount * 3)

    let index = 0
    for (let i = -cols / 2; i < cols / 2; i++) {
      for (let j = -rows / 2; j < rows / 2; j++) {
        const positionIndex = index * 3
        this.positions[positionIndex] = i
        this.positions[positionIndex + 1] = j
        this.positions[positionIndex + 2] = 0

        this.dummyObject.position.set(i, j, 0)
        this.dummyObject.updateMatrix()
        this.mesh.setMatrixAt(index, this.dummyObject.matrix)
        index++
      }
    }

    this.mesh.instanceMatrix.needsUpdate = true

    this.clock = new Clock()
    this.stats = new Stats()
    this.stats.showPanel(0)
    if (options.statsRef.current) {
      this.stats.dom.style.position = 'relative'
      this.statsRef = options.statsRef.current
      if (this.statsRef.hasChildNodes()) {
        this.statsRef.innerHTML = ''
      }
      this.statsRef.appendChild(this.stats.dom)
    }

    console.clear()
    this.render()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
    console.log('render calls: ', this.renderer.info.render.calls)
  }

  rotateX(angle: number) {
    this.grid.forEach(({ mesh }) => {
      mesh.rotateX(angle)
    })
    this.render()
  }

  rotateY(angle: number) {
    this.grid.forEach(({ mesh }) => {
      mesh.rotateY(angle)
    })
    this.render()
  }

  rotateZ(angle: number) {
    this.grid.forEach(({ mesh }) => {
      mesh.rotateZ(angle)
    })
    this.render()
  }

  getMeshCount() {
    return this.mesh.count
  }

  startLoop() {
    this.stats.begin()
    const elapsedTime = this.clock.getElapsedTime()

    for (let i = 0; i < this.mesh.count; i++) {
      const xRotation = elapsedTime
      const yRotation = elapsedTime
      const zRotation = elapsedTime
      const position = [
        this.positions[i * 3],
        this.positions[i * 3 + 1],
        this.positions[i * 3 + 2],
      ]
      this.dummyObject.rotation.set(xRotation, yRotation, zRotation)
      this.dummyObject.position.fromArray(position)
      this.dummyObject.updateMatrix()

      this.mesh.setMatrixAt(i, this.dummyObject.matrix)
    }

    this.mesh.instanceMatrix.needsUpdate = true

    this.render()
    this.stats.end()
    this.RAF = requestAnimationFrame(this.startLoop.bind(this))
  }

  stopLoop() {
    cancelAnimationFrame(this.RAF)
  }

  destroy() {
    this.statsRef.innerHTML = ''
    this.stopLoop()
  }
}

export default function Threejs04() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const threeRef = useRef<ThreeCanvas | null>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const [meshCount, setMeshCount] = useState(0)

  useEffect(() => {
    if (threeRef.current) return

    threeRef.current = new ThreeCanvas({
      canvasRef,
      statsRef,
    })

    return () => {
      if (threeRef.current) {
        threeRef.current.destroy()
        threeRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!threeRef.current) {
      return
    }

    setMeshCount(threeRef.current.getMeshCount())
  }, [threeRef])

  function startLoop() {
    if (threeRef.current) {
      threeRef.current.startLoop()
    }
  }

  function stopLoop() {
    if (threeRef.current) {
      threeRef.current.stopLoop()
    }
  }

  return (
    <>
      <h2 className="text-blue mb-2 text-lg">{meshCount} mesh instances</h2>
      <CustomCanvas ref={canvasRef} />

      <div className="relative mb-24">
        <div ref={statsRef} className="absolute right-0 top-2"></div>

        <div className="mt-3 flex gap-2">
          <CustomButton onClick={startLoop}>start loop</CustomButton>
          <CustomButton onClick={stopLoop}>stop loop</CustomButton>
        </div>
      </div>
    </>
  )
}
