import { BackgroundRunes } from './components/BackgroundRunes'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { StatsSection } from './components/StatsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-grimoire-purple focus:px-4 focus:py-2 focus:font-inter focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <BackgroundRunes />
      <Header />
      <main id="main" className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <StatsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
