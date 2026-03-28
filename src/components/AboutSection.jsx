import { motion } from 'framer-motion'
import { fadeInUp } from '../utils/animationConfig'

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="relative z-10 scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="sobre-heading"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          {...fadeInUp}
          className="rounded-xl border border-grimoire-purple/30 bg-[linear-gradient(180deg,rgba(106,13,173,0.12)_0%,rgba(58,12,163,0.06)_100%)] p-8 shadow-[0_0_24px_rgba(106,13,173,0.15)] sm:p-10"
        >
          <h2
            id="sobre-heading"
            className="font-cinzel text-3xl font-semibold text-grimoire-purple-light sm:text-4xl"
            style={{ textShadow: '0 0 16px rgba(157, 78, 221, 0.45)' }}
          >
            Sobre o Mago
          </h2>
          <p className="mt-6 font-inter text-base leading-relaxed text-grimoire-text/95 sm:text-lg">
            Sou <strong className="text-grimoire-cyan">Giovanni Cessel</strong>, formado em Análise e
            Desenvolvimento de Sistemas e{' '}
            <strong className="text-grimoire-purple-light">pós-graduado em Data Science</strong>.
            Transformo requisitos em soluções, código em feitiços que rodam em produção e dados em
            insights — do primeiro &quot;Hello World&quot; a sistemas que organizam informação e
            experiências.
          </p>
          <p className="mt-4 font-inter text-base leading-relaxed text-grimoire-muted sm:text-lg">
            Este grimório reúne missões concluídas, feitiços técnicos e conexões para novas jornadas.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
