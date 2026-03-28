import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { fadeInUp } from '../utils/animationConfig'

const LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/giovanni-cessel/',
    icon: FaLinkedin,
    description: 'Perfil profissional',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/giovannicessel/',
    icon: FaGithub,
    description: 'Repositórios e código',
  },
]

export function ContactSection() {
  return (
    <section
      id="conexoes"
      className="relative z-10 scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="conexoes-heading"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h2
          id="conexoes-heading"
          {...fadeInUp}
          className="font-cinzel text-center text-3xl font-semibold text-grimoire-purple-light sm:text-4xl"
          style={{ textShadow: '0 0 16px rgba(157, 78, 221, 0.45)' }}
        >
          Conexões astrais
        </motion.h2>
        <p className="mx-auto mt-3 text-center font-inter text-grimoire-muted">
          Canais para colaboração, oportunidades e novas missões.
        </p>
        <ul className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
          {LINKS.map((item) => {
            const Icon = item.icon
            return (
              <motion.li key={item.href} whileHover={{ scale: 1.08 }} transition={{ duration: 0.25 }}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 rounded-xl px-6 py-4 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-grimoire-cyan"
                  aria-label={`${item.label} — ${item.description}`}
                >
                  <Icon
                    className="h-14 w-14 text-grimoire-purple transition-[color,filter] group-hover:text-grimoire-cyan"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(106, 13, 173, 0.65))',
                    }}
                    aria-hidden
                  />
                  <span className="font-cinzel text-lg text-grimoire-text group-hover:text-grimoire-cyan">
                    {item.label}
                  </span>
                  <span className="font-inter text-sm text-grimoire-muted">{item.description}</span>
                </a>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
