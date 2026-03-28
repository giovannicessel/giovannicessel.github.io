const RUNE_LINE = 'ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚻ'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-grimoire-purple/25 bg-grimoire-dark/90 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <p
          className="font-runic text-lg tracking-[0.35em] text-grimoire-cyan sm:text-xl"
          style={{
            textShadow: '0 0 12px rgba(0, 217, 255, 0.55)',
            animation: 'rune-glow 3s ease-in-out infinite',
          }}
          aria-hidden
        >
          {RUNE_LINE}
        </p>
        <p className="mt-6 font-inter text-sm text-grimoire-muted">
          © {new Date().getFullYear()} Giovanni Cessel — Grimório de Desenvolvedor
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 font-inter text-sm">
          <a
            href="https://github.com/giovannicessel/"
            className="text-grimoire-purple-light hover:text-grimoire-cyan hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span className="text-grimoire-muted" aria-hidden>
            ·
          </span>
          <a
            href="https://www.linkedin.com/in/giovanni-cessel/"
            className="text-grimoire-purple-light hover:text-grimoire-cyan hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
