import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const NAV = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'feiticos', label: 'Feitiços' },
  { id: 'missoes', label: 'Missões' },
  { id: 'alquimia', label: 'Alquimia' },
  { id: 'conexoes', label: 'Conexões' },
]

function scrollToId(id) {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-grimoire-purple/20 bg-grimoire-dark/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <motion.a
          href="#inicio"
          className="font-orbitron text-lg font-bold tracking-wide text-grimoire-purple sm:text-xl"
          style={{
            textShadow: '0 0 18px rgba(106, 13, 173, 0.85), 0 0 32px rgba(0, 217, 255, 0.35)',
          }}
          whileHover={{ scale: 1.03 }}
          onClick={(e) => {
            e.preventDefault()
            scrollToId('inicio')
          }}
        >
          Grimório
        </motion.a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-lg px-3 py-2 font-inter text-sm text-grimoire-text/90 transition-colors hover:bg-grimoire-purple/15 hover:text-grimoire-purple-light"
              onClick={(e) => {
                e.preventDefault()
                scrollToId(item.id)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-grimoire-cyan md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiX className="h-7 w-7" /> : <HiMenuAlt3 className="h-7 w-7" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="border-t border-grimoire-purple/25 bg-grimoire-dark/95 px-4 py-4 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block rounded-lg px-3 py-3 font-inter text-grimoire-text hover:bg-grimoire-purple/20 hover:text-grimoire-purple-light"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToId(item.id)
                      setOpen(false)
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
