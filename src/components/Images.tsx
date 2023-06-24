import { useHookstate } from '@hookstate/core'
import { useDrag } from '@use-gesture/react'
import * as classNames from 'classnames'
import { motion } from 'framer-motion'
import { ReactElement, useState } from 'react'
import { Portal } from 'react-portal'
import useMeasure from 'react-use-measure'

export interface ImagesViewProps {
  sources: string[]
}

export default function Images(props: ImagesViewProps): ReactElement {
  const [containerRef, bounds] = useMeasure()
  const transformY = useHookstate(0)
  const [selected, setSelected] = useState<string>('')
  const [open, setOpen] = useState(false)
  const bind = useDrag(({ movement: [_, y] }) => onScroll(-y))
  function onScroll(y: number) {
    const containerHeight = bounds.height
    const maxScroll = -(containerHeight - window.innerHeight) * 3
    if (!y || y === 0 || selected || window.innerHeight > containerHeight)
      return
    if (y > 0) transformY.set((e) => (e <= maxScroll ? e : e - 20))
    else transformY.set((e) => (e >= 0 ? e : e + 20))
  }
  return (
    <motion.div
      animate={{ y: transformY.value }}
      className='flex items-start flex-wrap gap-4 m-4 touch-none'
      onWheel={(e) => onScroll(e.deltaY)}
      ref={containerRef}
      {...(bind() as any)}
    >
      {props.sources.map((image, i) => (
        <motion.img
          key={i}
          whileHover={{ scale: 1.1 }}
          className='w-[30%] rounded-lg select-none touch-none'
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
  )
}
