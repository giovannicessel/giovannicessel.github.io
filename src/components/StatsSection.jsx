import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useCountUp } from '../hooks/useCountUp'
import { fadeInUp } from '../utils/animationConfig'

const LANG_DATA = [
  { name: 'Python', value: 45, fill: '#3776ab' },
  { name: 'Java', value: 25, fill: '#6a0dad' },
  { name: 'JS', value: 20, fill: '#00d9ff' },
  { name: 'Outros', value: 10, fill: '#39ff14' },
]

export function StatsSection() {
  const [repos, setRepos] = useState(4)
  const [followers, setFollowers] = useState(4)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch('https://api.github.com/users/giovannicessel')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return
        setRepos(typeof data.public_repos === 'number' ? data.public_repos : 4)
        setFollowers(typeof data.followers === 'number' ? data.followers : 0)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const rCount = useCountUp(repos, 1200, !loading)
  const fCount = useCountUp(followers, 1200, !loading)

  return (
    <section
      id="alquimia"
      className="relative z-10 scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="alquimia-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="alquimia-heading"
          {...fadeInUp}
          className="font-cinzel text-center text-3xl font-semibold text-grimoire-purple-light sm:text-4xl"
          style={{ textShadow: '0 0 16px rgba(157, 78, 221, 0.45)' }}
        >
          Alquimia
        </motion.h2>
        <p className="mx-auto mt-3 max-w-2xl text-center font-inter text-grimoire-muted">
          Números do GitHub (API pública) e visão aproximada de linguagens nos projetos.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            {...fadeInUp}
            className="rounded-xl border border-grimoire-purple/30 bg-grimoire-darker/60 p-8 shadow-[0_0_24px_rgba(106,13,173,0.2)]"
          >
            <h3 className="font-cinzel text-xl text-grimoire-text">Presença no GitHub</h3>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="font-inter text-sm text-grimoire-muted">Repositórios públicos</dt>
                <dd className="font-orbitron mt-1 text-4xl text-grimoire-cyan">{rCount}</dd>
              </div>
              <div>
                <dt className="font-inter text-sm text-grimoire-muted">Seguidores</dt>
                <dd className="font-orbitron mt-1 text-4xl text-grimoire-purple-light">{fCount}</dd>
              </div>
            </dl>
            <p className="mt-6 font-courier text-xs text-grimoire-muted">
              Fonte:{' '}
              <a
                href="https://api.github.com/users/giovannicessel"
                className="text-grimoire-cyan hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                api.github.com/users/giovannicessel
              </a>
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            className="rounded-xl border border-grimoire-purple/30 bg-grimoire-darker/60 p-6 shadow-[0_0_24px_rgba(106,13,173,0.2)]"
          >
            <h3 className="font-cinzel text-xl text-grimoire-text">Linguagens (estimativa)</h3>
            <div className="mt-4 h-56 w-full min-w-0 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={LANG_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: '#808080', fontSize: 12 }} axisLine={false} />
                  <YAxis tick={{ fill: '#808080', fontSize: 12 }} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#1a1f3a',
                      border: '1px solid rgba(106, 13, 173, 0.4)',
                      borderRadius: 8,
                      color: '#e0e0e0',
                    }}
                    formatter={(v) => [`${v}%`, '']}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {LANG_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
