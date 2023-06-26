import * as classNames from 'classnames'
import { motion } from 'framer-motion'
import Images from './Images'
import ProjectInfo from './ProjectInfo'
import type { ReactElement } from 'react'
import { useHookstate } from '@hookstate/core'
import {
  seeMoreState,
  selectedProjectState,
  showAboutState,
} from '../state/project'
import { projects } from '../constants/project'

export interface ProjectProps {
  data: (typeof projects)[number]
  index: number
}

export default function Project(props: ProjectProps): ReactElement {
  const selectedProject = useHookstate(selectedProjectState)
  const seeMore = useHookstate(seeMoreState)
  const showAbout = useHookstate(showAboutState)
  return (
    <motion.div
      animate={{
        width:
          selectedProject.value === props.index && !showAbout.value
            ? '100%'
            : '0%',
      }}
      className='w-screen h-screen overflow-hidden absolute top-0 left-0'
      initial={false}
    >
      <div
        className={classNames(
          'grid grid-cols-4 md:grid-cols-8 w-screen h-screen',
        )}
      >
        <div className={classNames('col-span-4 overflow-hidden mt-5 md:mt-0')}>
          <motion.div
            animate={{ height: seeMore.value ? '0%' : '100%' }}
            className='w-full h-full overflow-hidden'
          >
            <img
              src={props.data.logo}
              className='h-full md:h-screen w-[70%] object-contain mx-auto'
            />
          </motion.div>
          <Images sources={props.data.images} />
        </div>
        <ProjectInfo
          title={props.data.title}
          by={props.data.by}
          href={props.data.site}
          description={props.data.description}
        />
        <div className='col-span-2 text-center my-auto ml-5'>
          {props.data.googlePlay && (
            <button
              onClick={() => window.open(props.data.googlePlay, '_blank')}
            >
              <img
                className='w-40'
                id='google_play_button'
                src='/badges/google-play.png'
              />
            </button>
          )}
          {props.data.appStore && (
            <button onClick={() => window.open(props.data.appStore, '_blank')}>
              <img className='w-40' src='/badges/app-store.png' />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
