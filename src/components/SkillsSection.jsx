import { motion } from 'framer-motion'
import { SiPython, SiJavascript, SiMysql, SiGit, SiReact } from 'react-icons/si'
import { GiSpellBook } from 'react-icons/gi'
import { FaChartLine } from 'react-icons/fa'
import { SkillCard } from './SkillCard'
import { fadeInUp } from '../utils/animationConfig'

const SKILLS = [
  {
    name: 'Python',
    description: 'Scripts, exercícios e lógica para dominar serpentes de código.',
    icon: SiPython,
    accent: '#3776ab',
  },
  {
    name: 'JavaScript',
    description: 'Interatividade e base para ecossistemas web modernos.',
    icon: SiJavascript,
    accent: '#f7df1e',
  },
  {
    name: 'SQL',
    description: 'Consultas, modelagem e comunicação com bancos de dados.',
    icon: SiMysql,
    accent: '#4479a1',
  },
  {
    name: 'Git',
    description: 'Versionamento, branches e histórico que contam sua jornada.',
    icon: SiGit,
    accent: '#f05032',
  },
  {
    name: 'React',
    description: 'Componentes reutilizáveis e interfaces declarativas.',
    icon: SiReact,
    accent: '#61dafb',
  },
  {
    name: 'Análise de Sistemas',
    description: 'Requisitos, processos e visão de solução de ponta a ponta.',
    icon: GiSpellBook,
    accent: '#6a0dad',
  },
  {
    name: 'Data Science',
    description: 'Pós-graduação: modelagem, dados e extração de valor a partir da informação.',
    icon: FaChartLine,
    accent: '#00d9ff',
  },
]

export function SkillsSection() {
  return (
    <section
      id="feiticos"
      className="relative z-10 scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="feiticos-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="feiticos-heading"
          {...fadeInUp}
          className="font-cinzel text-center text-3xl font-semibold text-grimoire-purple-light sm:text-4xl"
          style={{ textShadow: '0 0 16px rgba(157, 78, 221, 0.45)' }}
        >
          Feitiços
        </motion.h2>
        <p className="mx-auto mt-3 max-w-2xl text-center font-inter text-grimoire-muted">
          Tecnologias e práticas que sustentam os projetos deste grimório.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <SkillCard
                icon={s.icon}
                name={s.name}
                description={s.description}
                accent={s.accent}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
