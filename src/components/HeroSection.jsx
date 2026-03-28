import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter'

const TITLE = 'Giovanni Cessel'
const SUBTITLE = 'Mago em Treinamento | Analista de Sistemas'
const GITHUB_USER = 'giovannicessel'

const DECOR = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ']

export function HeroSection() {
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(`https://api.github.com/users/${GITHUB_USER}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.avatar_url) setAvatarUrl(data.avatar_url)
      })
      .catch(() => {
        if (!cancelled) setAvatarUrl(`https://github.com/${GITHUB_USER}.png`)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const titleTw = useTypewriter(TITLE, 100, 0, true)
  const subtitleTw = useTypewriter(SUBTITLE, 50, 400, titleTw.isComplete)

  const typingDone = titleTw.isComplete && subtitleTw.isComplete

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-8"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-8 opacity-40">
        {DECOR.map((r, i) => (
          <motion.span
            key={r}
            className="font-runic text-4xl text-grimoire-cyan/80 sm:text-5xl"
            style={{ textShadow: '0 0 12px rgba(0, 217, 255, 0.6)' }}
            animate={{ y: [0, -12, 0], opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          >
            {r}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <motion.div
          className="mb-8 h-28 w-28 overflow-hidden rounded-full border-2 border-grimoire-purple/50 bg-gradient-to-br from-grimoire-darker to-grimoire-dark shadow-[0_0_30px_rgba(106,13,173,0.45),0_0_50px_rgba(0,217,255,0.2)] sm:h-32 sm:w-32"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Giovanni Cessel"
              width={128}
              height={128}
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center" aria-hidden>
              <span className="font-orbitron text-3xl font-bold text-grimoire-purple-light sm:text-4xl">
                GC
              </span>
            </div>
          )}
        </motion.div>

        <motion.h1
          id="hero-title"
          className="font-orbitron text-4xl font-bold leading-tight text-grimoire-purple sm:text-5xl md:text-6xl lg:text-7xl"
          style={{
            textShadow:
              '0 0 22px rgba(106, 13, 173, 0.85), 0 0 44px rgba(0, 217, 255, 0.35)',
          }}
          animate={{
            textShadow: [
              '0 0 22px rgba(106, 13, 173, 0.85), 0 0 44px rgba(0, 217, 255, 0.35)',
              '0 0 36px rgba(106, 13, 173, 1), 0 0 56px rgba(0, 217, 255, 0.55)',
              '0 0 22px rgba(106, 13, 173, 0.85), 0 0 44px rgba(0, 217, 255, 0.35)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {titleTw.displayedText}
          {!titleTw.isComplete && <span className="animate-pulse text-grimoire-cyan">|</span>}
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl font-inter text-lg text-grimoire-text sm:text-xl md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: subtitleTw.displayedText.length > 0 ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        >
          {subtitleTw.displayedText}
          {titleTw.isComplete && !subtitleTw.isComplete && (
            <span className="animate-pulse text-grimoire-cyan">|</span>
          )}
        </motion.p>

        <motion.a
          href="#sobre"
          className="mt-10 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-grimoire-purple to-grimoire-purple-light px-8 py-3 font-inter text-base font-semibold text-white shadow-[0_0_24px_rgba(106,13,173,0.55)] transition-transform"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Explorar grimório — ir para a seção Sobre"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Explorar Grimório
        </motion.a>
      </div>

      {!typingDone && (
        <span className="sr-only" aria-live="polite">
          Carregando apresentação
        </span>
      )}
    </section>
  )
}
