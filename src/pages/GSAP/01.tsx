import gsap, { Power3 } from 'gsap'
import { CustomButton } from '../../components/CustomButton'
import { useRef } from 'react'

export default function GSAP01() {
  console.clear()
  const tweenRef = { value: 0 }
  const ref = useRef<HTMLDivElement | null>(null)

  function tweenFromTo(from: number, to: number) {
    if (ref.current) {
      gsap.fromTo(
        tweenRef,
        { value: from },
        {
          value: to,
          ease: Power3.easeInOut,
          duration: 4,
          onUpdate: () => {
            if (ref.current) {
              ref.current.innerHTML = tweenRef.value.toFixed(1)
            }
          },
        },
      )
    }
  }

  return (
    <>
      <h2 className="text-blue mb-2 text-lg">tween from 3 to 10</h2>

      <div className="bg-light relative block min-h-[500px] w-full overflow-hidden rounded-lg shadow-lg">
        <p
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-5xl"
          ref={ref}
        >
          3.0
        </p>
      </div>

      <div className="mt-3 flex gap-2">
        <CustomButton onClick={() => tweenFromTo(3, 10)}>
          start tween
        </CustomButton>
      </div>
    </>
  )
}
