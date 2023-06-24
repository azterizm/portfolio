import { useHookstate } from '@hookstate/core'
import { motion, MotionConfig } from 'framer-motion'
import About from './components/About'
import Project from './components/Project'
import ProjectSelector from './components/ProjectSelector'
import { projects } from './constants/project'
import { handleNavigation } from './hooks/project'
import { seeMoreState } from './state/project'

function App() {
  const seeMore = useHookstate(seeMoreState)

  handleNavigation()
  return (
    <MotionConfig transition={{ duration: 0.5 }}>
      <About />
    </MotionConfig>
  )
}

// {projects.map((project, i) => (
//   <Project data={project} index={i} />
// ))}
// <ProjectSelector />
// <h1 className='text-5xl absolute top-0 right-0'>my work</h1>
// <motion.h2
//   animate={{ x: seeMore.value ? '-100%' : '0' }}
//   className='absolute bottom-0 left-0 text-2xl p-4 py-2 border-t-2 border-r-2 border-black'
// >
//   about
// </motion.h2>
// <motion.a
//   href='mailto:abdielprime@gmail.com'
//   className='absolute bottom-0 right-0 uppercase text-2xl p-4 py-2 border-t-2 border-l-2 border-black'
// >
//   contact
// </motion.a>

export default App
