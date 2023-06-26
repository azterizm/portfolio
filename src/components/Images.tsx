import { useHookstate } from '@hookstate/core'
import * as classNames from 'classnames'
import { motion } from 'framer-motion'
import { ReactElement, useState } from 'react'
import { Portal } from 'react-portal'
import { seeMoreState } from '../state/project'

export interface ImagesViewProps {
  sources: string[]
}

export default function Images(props: ImagesViewProps): ReactElement {
  const seeMore = useHookstate(seeMoreState)
  const [selected, setSelected] = useState<string>('')
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      animate={{ height: seeMore.value ? '100%' : '0%' }}
      transition={{ delay: 0.5 }}
      className={classNames(
        'w-full h-full',
        seeMore.value ? 'overflow-auto' : 'overflow-hidden',
      )}
    >
      <motion.div className='flex items-start flex-wrap gap-4 m-4 justify-center'>
        {props.sources.map((image, i) => (
          <motion.img
            key={i}
            whileHover={{ scale: 1.1 }}
            className='w-[30%] rounded-lg select-none'
            src={image}
            alt='Application screenshot'
            onClick={() => (setSelected(image), setOpen(true))}
          />
        ))}
        <Portal>
          <motion.div
            className='absolute top-0 left-0 z-10 w-screen bg-black h-screen overflow-hidden'
            animate={{ height: open ? '100vh' : '0vh' }}
            initial={false}
          >
            <img
              className='max-w-screen w-screen object-contain max-h-screen relative'
              src={selected}
            />
            <div className='absolute top-5 right-5 h-[2rem] overflow-hidden mix-blend-exclusion z-20'>
              <motion.button
                onClick={() => setOpen(false)}
                transition={{ delay: 0.25 }}
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className={classNames(
                  'relative group duration-500 active:scale-90 scale-100 transition-transform text-[#e8e8e8]',
                )}
              >
                Close
                <div className='absolute -bottom-1 left-0 w-full h-1 bg-[#e8e8e8] scale-x-100 group-hover:scale-x-0 origin-left transition-transform duration-500' />
              </motion.button>
            </div>
          </motion.div>
        </Portal>
      </motion.div>
    </motion.div>
  )
}
