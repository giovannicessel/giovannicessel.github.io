import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

export function ProjectCard({
  title,
  description,
  tags,
  href,
  languageLabel,
  languageAccent,
  languageIcon: LanguageIcon,
  homepage,
  isNew,
}) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-xl border bg-grimoire-darker/80 shadow-[0_0_20px_rgba(106,13,173,0.2)]"
      style={{ borderColor: `${languageAccent}66` }}
      whileHover={{ y: -10, scale: 1.02 }}
      animate={
        isNew
          ? {
              boxShadow: [
                `0 0 20px ${languageAccent}33`,
                `0 0 30px ${languageAccent}66`,
                `0 0 20px ${languageAccent}33`,
              ],
            }
          : undefined
      }
      transition={{
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1],
        boxShadow: { duration: 1.2, repeat: isNew ? 2 : 0 },
      }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-grimoire-cyan"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-grimoire-dark">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(58,12,163,0.45),rgba(10,14,39,0.9)_70%)]">
            <motion.div
              className="text-7xl"
              animate={{ y: [0, -8, 0], rotate: [0, -5, 5, 0], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            >
              <LanguageIcon className="h-20 w-20" style={{ color: languageAccent }} />
            </motion.div>
            <span
              className="absolute inset-0"
              style={{
                boxShadow: `inset 0 0 80px ${languageAccent}40`,
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/25 transition-colors group-hover:from-black/80" />

          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold text-grimoire-text/95 backdrop-blur-sm">
            <LanguageIcon className="h-3.5 w-3.5" style={{ color: languageAccent }} />
            <span>{languageLabel}</span>
          </div>

          {isNew && (
            <span className="absolute right-3 top-3 rounded-md bg-grimoire-green/90 px-2 py-1 text-xs font-bold text-grimoire-dark shadow-[0_0_16px_rgba(57,255,20,0.45)]">
              Nova missão
            </span>
          )}

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <span className="font-cinzel text-center text-lg font-semibold text-white drop-shadow-lg sm:text-xl">
              {title}
            </span>
          </div>
        </div>

        <div className="p-5">
          <p className="font-inter text-sm leading-relaxed text-grimoire-muted">{description}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-md border px-2 py-0.5 font-courier text-xs"
                style={{
                  borderColor: `${languageAccent}55`,
                  color: languageAccent,
                  background: 'rgba(10, 14, 39, 0.75)',
                }}
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 text-grimoire-cyan">
              <FaGithub className="h-4 w-4" aria-hidden />
              Repositório
            </span>
            {homepage && (
              <span className="inline-flex items-center gap-1 text-grimoire-green">
                <FaExternalLinkAlt className="h-3.5 w-3.5" aria-hidden />
                Site publicado
              </span>
            )}
          </div>
        </div>
      </a>
    </motion.article>
  )
}
