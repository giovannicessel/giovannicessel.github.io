import { useEffect, useState } from 'react'

export function useCountUp(end, duration = 1100, enabled = true) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled || end <= 0) {
      setValue(end)
      return undefined
    }
    setValue(0)
    const startTime = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - (1 - p) ** 3
      setValue(Math.round(end * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, enabled])

  return value
}
