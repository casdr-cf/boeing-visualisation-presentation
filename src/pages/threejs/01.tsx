import { RefObject, useEffect, useRef, useState } from 'react'
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'
import { CustomButton } from '../../components/CustomButton'
import { CustomCanvas } from '../../components/CustomCanvas'

interface ThreeCanvasOptions {
  canvasRef: RefObject<HTMLCanvasElement>
}

class ThreeCanvas {
  private scene: Scene
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer
  private width: number
  private height: number
  private mesh: Mesh

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
    this.camera.position.z = 8

    this.renderer = new WebGLRenderer({ canvas })
    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xf5f5f5)

    const geometry = new BoxGeometry(2, 2, 2)
    const material = new MeshBasicMaterial({
      color: 'blue',
      wireframe: true,
    })
    this.mesh = new Mesh(geometry, material)
    this.scene.add(this.mesh)
    console.clear()
    this.render()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
    console.log('render calls: ', this.renderer.info.render.calls)
  }

  rotateX(angle: number) {
    this.mesh.rotateX(angle)
    this.render()
  }

  rotateY(angle: number) {
    this.mesh.rotateY(angle)
    this.render()
  }

  rotateZ(angle: number) {
    this.mesh.rotateZ(angle)
    this.render()
  }
}

export default function Threejs01() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const threeRef = useRef<ThreeCanvas | null>(null)

  const [xAngle, setXAngle] = useState(0.1)
  const [yAngle, setYAngle] = useState(0.1)
  const [zAngle, setZAngle] = useState(0.1)

  useEffect(() => {
    if (threeRef.current) return

    threeRef.current = new ThreeCanvas({
      canvasRef,
    })

    return () => {
      if (threeRef.current) {
        threeRef.current = null
      }
    }
  }, [])

  function rotateX() {
    if (threeRef.current) {
      threeRef.current.rotateX(xAngle)
      setXAngle((prevAngle) => prevAngle + 0.001)
    }
  }

  function rotateY() {
    if (threeRef.current) {
      threeRef.current.rotateY(yAngle)
      setYAngle((prevAngle) => prevAngle + 0.001)
    }
  }

  function rotateZ() {
    if (threeRef.current) {
      threeRef.current.rotateZ(zAngle)
      setZAngle((prevAngle) => prevAngle + 0.001)
    }
  }

  return (
    <>
      <h2 className="text-blue mb-2 text-lg">1 mesh</h2>
      <CustomCanvas ref={canvasRef} />

      <div className="mt-3 flex gap-2">
        <CustomButton onClick={rotateX}>rotate x</CustomButton>
        <CustomButton onClick={rotateY}>rotate y</CustomButton>
        <CustomButton onClick={rotateZ}>rotate z</CustomButton>
      </div>
    </>
  )
}
