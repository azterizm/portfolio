import { useHookstate } from '@hookstate/core'
import * as classNames from 'classnames'
import { motion } from 'framer-motion'
import { ReactElement } from 'react'
import { useWindowSize } from 'usehooks-ts'
import {
  seeMoreState,
  seeReviewsState,
  selectedProjectState,
  showAboutState,
} from '../state/project'

export interface ProjectSelectorProps {
  projectLogos: string[]
}

export default function ProjectSelector(
  props: ProjectSelectorProps,
): ReactElement {
  const selected = useHookstate(selectedProjectState)
  const seeMore = useHookstate(seeMoreState)
  const seeReviews = useHookstate(seeReviewsState)
  const showAbout = useHookstate(showAboutState)
  const { width } = useWindowSize()
  return (
    <motion.div
      animate={{
        y:
          seeMore.value || showAbout.value || seeReviews.value
            ? `${width > 768 ? '' : '-'}100%`
            : '0%',
      }}
      className='absolute w-screen md:bottom-0 left-0 grid grid-cols-8'
    >
      <div className='md:col-span-4' />
      <div className='col-span-2 flex items-center gap-2'>
        {props.projectLogos.map((image, i) => (
          <motion.img
            src={image}
            alt={'project ' + (i + 1)}
            key={i}
            onClick={() => selected.set(i)}
            animate={{ width: selected.value === i ? '6rem' : '3rem' }}
            transition={{ duration: 0.2, type: 'spring' }}
            whileHover={{ width: selected.value === i ? '6rem' : '3.25rem' }}
            className={classNames(
              'h-12 aspect-square w-5 backdrop-blur-lg bg-opacity-80 object-contain p-2 rounded-b-lg md:rounded-b-none',
              selected.value === i ? 'bg-neutral-400' : 'bg-neutral-200',
            )}
          />
        ))}
      </div>
    </motion.div>
  )
}
