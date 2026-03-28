import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'

export function ProjectCard({ title, description, tags, href, gradient }) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-xl border border-grimoire-purple/30 bg-grimoire-darker/80 shadow-[0_0_20px_rgba(106,13,173,0.2)]"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-grimoire-cyan"
      >
        <div
          className="relative aspect-video w-full overflow-hidden"
          style={{
            background: gradient,
          }}
        >
          <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/55" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <span className="font-cinzel text-center text-lg font-semibold text-white drop-shadow-lg sm:text-xl">
              {title}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 flex translate-y-2 items-center gap-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <FaGithub className="h-6 w-6 text-grimoire-cyan" aria-hidden />
            <span className="text-sm font-medium text-grimoire-text">Repositório</span>
          </div>
        </div>
        <div className="p-5">
          <p className="font-inter text-sm leading-relaxed text-grimoire-muted">{description}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-md border border-grimoire-cyan/35 bg-grimoire-dark/80 px-2 py-0.5 font-courier text-xs text-grimoire-cyan"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </a>
    </motion.article>
  )
}
