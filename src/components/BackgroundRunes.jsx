import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { getRuneByIndex } from '../utils/runeGenerator'
import { useScrollParallax } from '../hooks/useParallax'

function frac(i, salt) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function FloatingRune({ delay, duration, leftPct, bottomPct, rune }) {
  return (
    <motion.span
      className="pointer-events-none absolute select-none font-runic text-2xl font-bold text-grimoire-cyan sm:text-3xl"
      style={{
        left: `${leftPct}%`,
        bottom: `${bottomPct}%`,
        textShadow: '0 0 10px rgba(0, 217, 255, 0.75)',
        willChange: 'transform, opacity',
      }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        y: [-20, -280],
        x: [0, 36, -24, 14],
        opacity: [0, 1, 0.95, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden
    >
      {rune}
    </motion.span>
  )
}

export function BackgroundRunes() {
  const reduceMotion = useReducedMotion()
  const parallaxY = useScrollParallax([0, 900], [0, 50])
  const count = reduceMotion ? 8 : 18

  const runeConfigs = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        delay: frac(i, 1) * 5,
        duration: 8 + frac(i, 2) * 7,
        leftPct: 6 + frac(i, 3) * 88,
        bottomPct: 5 + frac(i, 4) * 30,
        rune: getRuneByIndex(i + 3),
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-grimoire-dark via-grimoire-darker to-grimoire-dark"
        style={{ y: reduceMotion ? 0 : parallaxY }}
      />
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,217,255,0.45)_1px,transparent_0)] [background-size:48px_48px]" />
      {runeConfigs.map((r) => (
        <FloatingRune
          key={r.id}
          delay={r.delay}
          duration={r.duration}
          leftPct={r.leftPct}
          bottomPct={r.bottomPct}
          rune={r.rune}
        />
      ))}
    </div>
  )
}
