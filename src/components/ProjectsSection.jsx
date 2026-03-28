import { motion } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import { fadeInUp } from '../utils/animationConfig'

const PROJECTS = [
  {
    title: 'PythonExercicios',
    description: 'Um compêndio de desafios para dominar Python e fortalecer a lógica.',
    tags: ['Python', 'Lógica'],
    href: 'https://github.com/giovannicessel/PythonExercicios',
    gradient: 'linear-gradient(135deg, #306998 0%, #1a1f3a 50%, #6a0dad 100%)',
  },
  {
    title: 'VericadorCPF',
    description: 'Um feitiço de proteção para validar identidades digitais (CPF).',
    tags: ['Python', 'Validação'],
    href: 'https://github.com/giovannicessel/VericadorCPF',
    gradient: 'linear-gradient(135deg, #3a0ca3 0%, #0a0e27 45%, #00d9ff 100%)',
  },
  {
    title: 'TesteBanco',
    description: 'Comunicação de objetos e classes em cenários de banco de dados.',
    tags: ['Java', 'OOP', 'Banco'],
    href: 'https://github.com/giovannicessel/TesteBanco',
    gradient: 'linear-gradient(135deg, #1a1f3a 0%, #3a0ca3 60%, #39ff14 90%)',
  },
  {
    title: 'Helloworld',
    description: 'O primeiro ritual: projeto inicial e ponto de partida da jornada.',
    tags: ['Início', 'Base'],
    href: 'https://github.com/giovannicessel/Helloworld',
    gradient: 'linear-gradient(135deg, #6a0dad 0%, #1a1f3a 50%, #00d9ff 100%)',
  },
]

export function ProjectsSection() {
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
        <p className="mx-auto mt-3 max-w-2xl text-center font-inter text-grimoire-muted">
          Repositórios públicos do perfil{' '}
          <a
            href="https://github.com/giovannicessel/"
            className="text-grimoire-cyan underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            giovannicessel
          </a>
          .
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.href} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
