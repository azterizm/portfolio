import { useHookstate } from '@hookstate/core'
import { motion, MotionConfig } from 'framer-motion'
import About from './components/About'
import Project from './components/Project'
import ProjectSelector from './components/ProjectSelector'
import { projects } from './constants/project'
import { handleNavigation } from './hooks/project'
import { removeLoader } from './hooks/ui'
import {
  canNavigateState,
  hideScrollIndicatorState,
  seeMoreState,
  showAboutState,
} from './state/project'

function App() {
  const seeMore = useHookstate(seeMoreState)
  const showAbout = useHookstate(showAboutState)
  const canNavigate = useHookstate(canNavigateState)
  const hideScrollIndicator = useHookstate(hideScrollIndicatorState)
  handleNavigation()
  removeLoader()
  return (
    <MotionConfig transition={{ duration: 0.5 }}>
      {projects.map((project, i) => (
        <Project
          key={i}
          data={project}
          index={i}
        />
      ))}
      <ProjectSelector projectLogos={projects.map((r) => r.logo)} />
      <motion.h1
        animate={{ x: showAbout.value ? '150%' : '0%' }}
        className='text-5xl absolute top-5 right-5 hidden md:block'
      >
        my work
      </motion.h1>
      <motion.h2
        animate={{ x: seeMore.value || showAbout.value ? '-100%' : '0' }}
        className='absolute bottom-0 left-0 text-2xl p-4 py-2 border-t-2 border-r-2 border-black cursor-pointer'
        onClick={() => (showAbout.set(true),
          canNavigate.set(false),
          hideScrollIndicator.set(true))}
        whileHover={{ scale: 1.1, x: 3, y: -3 }}
      >
        about
      </motion.h2>
      <motion.a
        href='mailto:contact@obad.work'
        className='absolute bottom-0 right-0 uppercase text-2xl p-4 py-2 border-t-2 border-l-2 border-black'
        whileHover={{ scale: 1.1, x: -3, y: -3 }}
      >
        contact
      </motion.a>
      <motion.div
        initial={false}
        className='overflow-hidden w-full absolute top-0 left-0'
        animate={{ height: showAbout.value ? '100%' : '0%' }}
      >
        <About />
      </motion.div>
    </MotionConfig>
  )
}

export default App
