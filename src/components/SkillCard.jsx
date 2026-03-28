import { motion } from 'framer-motion'

export function SkillCard({ icon: Icon, name, description, accent = '#6a0dad' }) {
  return (
    <motion.article
      className="rounded-xl border-2 border-grimoire-purple/35 bg-[linear-gradient(180deg,rgba(106,13,173,0.1)_0%,rgba(58,12,163,0.05)_100%)] p-6 shadow-[0_0_18px_rgba(106,13,173,0.2)]"
      style={{ borderColor: `${accent}55` }}
      whileHover={{
        y: -10,
        scale: 1.03,
        boxShadow: `0 12px 40px rgba(106, 13, 173, 0.35), 0 0 28px rgba(0, 217, 255, 0.25)`,
      }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.div
        whileHover={{ color: '#00d9ff' }}
        transition={{ duration: 0.3 }}
        className="mb-4 inline-block text-grimoire-purple"
        style={{ filter: 'drop-shadow(0 0 10px rgba(106, 13, 173, 0.75))' }}
      >
        <Icon className="h-12 w-12" aria-hidden />
      </motion.div>
      <h3 className="font-cinzel text-xl font-semibold text-grimoire-text">{name}</h3>
      <p className="mt-2 font-inter text-sm text-grimoire-muted sm:text-base">{description}</p>
    </motion.article>
  )
}
