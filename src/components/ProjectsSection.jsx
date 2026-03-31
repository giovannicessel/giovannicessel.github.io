import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { SiJavascript, SiPython, SiTypescript } from 'react-icons/si'
import { FaChartLine, FaCode, FaJava, FaQuestionCircle, FaRegStar } from 'react-icons/fa'
import { GiDiamondHard, GiLaurelCrown, GiSpellBook } from 'react-icons/gi'
import { ProjectCard } from './ProjectCard'
import { fadeInUp } from '../utils/animationConfig'

const GITHUB_USER = 'giovannicessel'
const STORAGE_KEY = 'grimorio_seen_repos_v1'

const FILTERS = ['Todos', 'Python', 'JavaScript', 'Java', 'Data']
const XP_RECENT_WINDOW_DAYS = 30
const FORCE_ARCHMAGE_PREVIEW = false

const RANKS = [
  {
    title: 'Apprentice',
    paletteLabel: 'Bronze',
    minXp: 0,
    maxXp: 249,
    color: '#cd7f32',
    Icon: FaRegStar,
  },
  {
    title: 'Adept',
    paletteLabel: 'Prata',
    minXp: 250,
    maxXp: 549,
    color: '#c0c0c0',
    Icon: GiSpellBook,
  },
  {
    title: 'Architect',
    paletteLabel: 'Ouro',
    minXp: 550,
    maxXp: 999,
    color: '#ffd700',
    Icon: GiLaurelCrown,
  },
  {
    title: 'Master',
    paletteLabel: 'Platina',
    minXp: 1000,
    maxXp: 1599,
    color: '#b3e5fc',
    Icon: GiLaurelCrown,
  },
  {
    title: 'Grandmaster',
    paletteLabel: 'Diamante',
    minXp: 1600,
    maxXp: 2399,
    color: '#7df9ff',
    Icon: GiDiamondHard,
  },
  {
    title: 'Archmage',
    paletteLabel: 'Lendário',
    minXp: 2400,
    maxXp: Infinity,
    color: '#d4b6ff',
    Icon: GiDiamondHard,
  },
]

const LANGUAGE_THEME = {
  Python: { label: 'Python', accent: '#39ff14', icon: SiPython },
  JavaScript: { label: 'JavaScript', accent: '#f7df1e', icon: SiJavascript },
  TypeScript: { label: 'TypeScript', accent: '#00d9ff', icon: SiTypescript },
  Java: { label: 'Java', accent: '#9d4edd', icon: FaJava },
  'Jupyter Notebook': { label: 'Data', accent: '#00d9ff', icon: FaChartLine },
  default: { label: 'Código', accent: '#9d4edd', icon: FaCode },
}

function getLanguageTheme(language) {
  return LANGUAGE_THEME[language] || LANGUAGE_THEME.default
}

function mapFilter(language) {
  if (!language) return 'Data'
  if (language === 'TypeScript') return 'JavaScript'
  if (language === 'Jupyter Notebook') return 'Data'
  return language
}

function normalizeUrl(url) {
  if (!url) return ''
  const trimmed = url.trim()
  if (!trimmed) return ''
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  return `https://${trimmed}`
}

function resolvePublishedSite(repo, language) {
  const frontendLang = ['JavaScript', 'TypeScript']
  if (!frontendLang.includes(language)) return ''

  const homepage = normalizeUrl(repo.homepage)
  if (homepage) return homepage

  if (repo.has_pages) {
    if (repo.name.toLowerCase() === `${GITHUB_USER}.github.io`) {
      return `https://${GITHUB_USER}.github.io/`
    }
    return `https://${GITHUB_USER}.github.io/${repo.name}/`
  }

  return ''
}

function getRankForXp(xp) {
  return RANKS.find((rank) => xp >= rank.minXp && xp <= rank.maxXp) || RANKS[0]
}

export function ProjectsSection() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Todos')
  const [newCount, setNewCount] = useState(0)
  const [lastSyncAt, setLastSyncAt] = useState(null)

  const fetchRepos = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
      )
      if (!res.ok) return
      const data = await res.json()

      const publicRepos = data
        .filter((repo) => !repo.fork)
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))

      const seenRaw = localStorage.getItem(STORAGE_KEY)
      const currentIds = publicRepos.map((r) => String(r.id))
      const seenSet = new Set(seenRaw ? JSON.parse(seenRaw) : [])
      const firstLoad = !seenRaw

      const justNew = firstLoad ? [] : currentIds.filter((id) => !seenSet.has(id))
      const merged = Array.from(new Set([...seenSet, ...currentIds]))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
      setNewCount(justNew.length)

      const mapped = publicRepos.map((repo) => {
        const language = repo.language || 'Jupyter Notebook'
        const theme = getLanguageTheme(language)
        const siteUrl = resolvePublishedSite(repo, language)
        const pushedAt = new Date(repo.pushed_at)
        const recentCutoff = Date.now() - XP_RECENT_WINDOW_DAYS * 24 * 60 * 60 * 1000
        return {
          id: String(repo.id),
          title: repo.name,
          description: repo.description || 'Missão sem descrição arcana registrada.',
          href: repo.html_url,
          homepage: siteUrl,
          language,
          languageLabel: theme.label,
          languageAccent: theme.accent,
          languageIcon: theme.icon,
          tags: [
            theme.label,
            repo.visibility === 'public' ? 'Público' : repo.visibility,
            `Atualizado ${new Date(repo.pushed_at).toLocaleDateString('pt-BR')}`,
          ],
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          recentActive: pushedAt.getTime() >= recentCutoff,
          filterGroup: mapFilter(language),
          isNew: justNew.includes(String(repo.id)),
        }
      })

      setRepos(mapped)
      setLastSyncAt(new Date())
    } catch {
      // Mantém os dados atuais caso a API falhe
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRepos()
  }, [fetchRepos])

  useEffect(() => {
    let cancelled = false
    let timerId

    const schedule = () => {
      const delayMs = 120000 + Math.floor(Math.random() * 180000)
      timerId = setTimeout(async () => {
        await fetchRepos()
        if (!cancelled) schedule()
      }, delayMs)
    }

    schedule()
    return () => {
      cancelled = true
      clearTimeout(timerId)
    }
  }, [fetchRepos])

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') fetchRepos()
    }
    const onFocus = () => fetchRepos()
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', onFocus)
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', onFocus)
    }
  }, [fetchRepos])

  const filteredRepos = useMemo(() => {
    if (filter === 'Todos') return repos
    return repos.filter((repo) => repo.filterGroup === filter)
  }, [filter, repos])

  const progress = useMemo(() => {
    const repoXp = repos.length * 50
    const starsXp = repos.reduce((acc, repo) => acc + repo.stars * 2, 0)
    const forksXp = repos.reduce((acc, repo) => acc + repo.forks * 3, 0)
    const recentXp = repos.filter((repo) => repo.recentActive).length
    const calculatedXp = repoXp + starsXp + forksXp + recentXp
    const totalXp = FORCE_ARCHMAGE_PREVIEW ? 2600 : calculatedXp

    const rank = getRankForXp(totalXp)
    const nextRank = RANKS.find((item) => item.minXp > rank.minXp) || null
    const progressPct = nextRank
      ? Math.min(
          100,
          ((totalXp - rank.minXp) / Math.max(1, nextRank.minXp - rank.minXp)) * 100,
        )
      : 100
    const xpToNext = nextRank ? Math.max(0, nextRank.minXp - totalXp) : 0

    return {
      totalXp,
      rank,
      nextRank,
      xpToNext,
      progressPct,
      breakdown: { repoXp, starsXp, forksXp, recentXp },
    }
  }, [repos])

  const syncLabel = useMemo(() => {
    if (!lastSyncAt) return 'Aguardando primeira sincronização...'
    const mins = Math.max(0, Math.round((Date.now() - lastSyncAt.getTime()) / 60000))
    if (mins < 1) return 'Sincronizado agora'
    if (mins === 1) return 'Sincronizado há 1 minuto'
    return `Sincronizado há ${mins} minutos`
  }, [lastSyncAt])

  return (
    <section
      id="missoes"
      className="relative z-10 scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="missoes-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="missoes-heading"
          {...fadeInUp}
          className="font-cinzel text-center text-3xl font-semibold text-grimoire-purple-light sm:text-4xl"
          style={{ textShadow: '0 0 16px rgba(157, 78, 221, 0.45)' }}
        >
          Missões
        </motion.h2>

        <p className="mx-auto mt-3 max-w-3xl text-center font-inter text-grimoire-muted">
          Repositórios públicos do perfil{' '}
          <a
            href="https://github.com/giovannicessel/"
            className="text-grimoire-cyan underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            giovannicessel
          </a>
        </p>

        <motion.div
          {...fadeInUp}
          className="mt-8 rounded-xl border bg-grimoire-darker/55 p-5 sm:p-6"
          style={{
            borderColor: `${progress.rank.color}99`,
            boxShadow: `0 0 24px ${progress.rank.color}33`,
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                  progress.rank.title === 'Archmage' ? 'archmage-medal' : ''
                }`}
                style={{
                  borderColor: `${progress.rank.color}99`,
                  color: progress.rank.color,
                  boxShadow: `0 0 20px ${progress.rank.color}55`,
                }}
                aria-label={`Medalha com paleta ${progress.rank.paletteLabel}`}
              >
                <progress.rank.Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-cinzel text-lg text-grimoire-text">
                  {progress.rank.title}
                </p>
                <p className="font-courier text-sm text-grimoire-cyan">{progress.totalXp} XP total</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-grimoire-muted">
              {progress.nextRank ? (
                <span>
                  Faltam <strong className="text-grimoire-green">{progress.xpToNext} XP</strong> para{' '}
                  {progress.nextRank.title}
                </span>
              ) : (
                <span className="text-grimoire-green">Nível máximo alcançado: Archmage</span>
              )}

              <div className="group relative">
                <button
                  type="button"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-grimoire-cyan/45 bg-grimoire-dark/70 text-grimoire-cyan transition hover:scale-105 hover:border-grimoire-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-grimoire-cyan"
                  aria-label="Como funciona o sistema de XP"
                >
                  <FaQuestionCircle className="h-4 w-4" />
                </button>

                <div className="pointer-events-none invisible absolute right-0 top-9 z-20 w-[320px] rounded-lg border border-grimoire-purple/45 bg-grimoire-dark/95 p-3 text-left opacity-0 shadow-[0_10px_36px_rgba(0,0,0,0.55)] transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <p className="font-cinzel text-sm text-grimoire-text">Sistema de XP do Grimório</p>
                  <ul className="mt-2 space-y-1 font-inter text-xs text-grimoire-muted">
                    <li>+50 XP por repositório público</li>
                    <li>+2 XP por estrela recebida</li>
                    <li>+3 XP por fork recebido</li>
                    <li>+1 XP por atividade recente (últimos 30 dias)</li>
                  </ul>
                  <p className="mt-2 font-inter text-xs text-grimoire-text/90">
                    A barra mostra seu progresso para o próximo título.
                  </p>
                  <p className="mt-1 font-courier text-[11px] text-grimoire-cyan">
                    Ranks: Apprentice → Adept → Architect → Master → Grandmaster → Archmage
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-grimoire-dark/90">
            <motion.div
              className={`h-full rounded-full ${
                progress.rank.title === 'Archmage' ? 'archmage-progress' : ''
              }`}
              style={{
                width: `${progress.progressPct}%`,
                background:
                  progress.rank.title === 'Archmage'
                    ? 'linear-gradient(90deg,#6a0dad,#00d9ff,#39ff14,#9d4edd)'
                    : `linear-gradient(90deg, ${progress.rank.color}, #00d9ff)`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress.progressPct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          <div className="mt-4 grid gap-2 text-xs text-grimoire-muted sm:grid-cols-2 lg:grid-cols-4">
            <span>Repos: +{progress.breakdown.repoXp} XP</span>
            <span>Stars: +{progress.breakdown.starsXp} XP</span>
            <span>Forks: +{progress.breakdown.forksXp} XP</span>
            <span>Atividade 30d: +{progress.breakdown.recentXp} XP</span>
          </div>

          <p className="mt-3 font-courier text-xs text-grimoire-muted">{syncLabel}</p>
        </motion.div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                filter === item
                  ? 'border-grimoire-cyan bg-grimoire-cyan/15 text-grimoire-cyan'
                  : 'border-grimoire-purple/35 bg-grimoire-dark/60 text-grimoire-text hover:border-grimoire-purple-light'
              }`}
            >
              {item}
            </button>
          ))}
          {newCount > 0 && (
            <span className="rounded-full bg-grimoire-green/90 px-3 py-1 text-xs font-semibold text-grimoire-dark shadow-[0_0_16px_rgba(57,255,20,0.45)]">
              +{newCount} nova(s) missão(ões)
            </span>
          )}
        </div>

        {loading ? (
          <p className="mt-12 text-center font-inter text-grimoire-muted">Invocando missões...</p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {filteredRepos.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 22, scale: repo.isNew ? 0.96 : 1 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <ProjectCard {...repo} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
