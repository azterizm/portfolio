import { useHookstate } from '@hookstate/core'
import { motion } from 'framer-motion'
import { ReactElement } from 'react'
import { seeMoreState, selectedProjectState } from '../state/project'

export interface ProjectSelectorProps {}

export default function ProjectSelector(
  props: ProjectSelectorProps,
): ReactElement {
  const selected = useHookstate(selectedProjectState)
  const seeMore = useHookstate(seeMoreState)
  return (
    <motion.div
      animate={{ y: seeMore.value ? '100%' : '0%' }}
      className='absolute w-screen bottom-0 left-0 grid grid-cols-8'
    >
      <div className='col-span-4' />
      <div className='col-span-2 flex items-center gap-2'>
        {['/logos/minipoc.png', '/logos/ummit.png'].map((image, i) => (
          <motion.img
            src={image}
            alt={'project ' + (i + 1)}
            key={i}
            onClick={() => selected.set(i)}
            animate={{ width: selected.value === i ? '6rem' : '3rem' }}
            transition={{ duration: 0.2, type: 'spring' }}
            whileHover={{ width: selected.value === i ? '6rem' : '3.25rem' }}
            className='h-12 aspect-square w-5 bg-neutral-300 object-contain p-2'
          />
        ))}
      </div>
    </motion.div>
  )
}
