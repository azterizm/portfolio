import { useHookstate } from '@hookstate/core'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { Portal } from 'react-portal'
import { seeMoreState, selectedProjectState } from '../state/project'

export interface ContentViewerProps {
  images: string[]
  videos: string[]
  logoPath?: string
  projectIndex: number
}

export default function ContentViewer(props: ContentViewerProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const seeMore = useHookstate(seeMoreState)
  const [selected, setSelected] = useState<null | {
    type: 'image' | 'video'
    src: string
  }>(null)
  const selectedProject = useHookstate(selectedProjectState)
  useEffect(() => {
    if (seeMore.value && selectedProject.value === props.projectIndex) {
      const videos = containerRef.current?.querySelectorAll('video')
      videos?.forEach((video) => {
        if (video.getAttribute('data-src') || !video.src) {
          video.src = video.getAttribute('data-src') || ''
          video.load()
          video.play()
        }
      })
    }
  }, [seeMore])
  return (
    <motion.div
      ref={containerRef}
      animate={{ height: seeMore.value ? '100%' : '0%' }}
      transition={{ delay: 0.5 }}
      className={classNames(
        'w-full h-full',
        seeMore.value ? 'overflow-auto' : 'overflow-hidden',
      )}
      id='content'
    >
      <motion.div className='flex items-start flex-wrap gap-4 m-4 justify-center'>
        {props.images.map((image, i) => (
          <motion.img
            key={i}
            whileHover={{ scale: 1.1 }}
            className='w-[30%] rounded-lg select-none'
            src={image}
            alt='Application screenshot'
            onClick={() => setSelected({ src: image, type: 'image' })}
            loading='lazy'
          />
        ))}
        {props.videos.map((video, i) => (
          <motion.video
            playsInline
            key={i}
            muted
            autoPlay
            whileHover={{ scale: 1.1 }}
            className='w-[30%] rounded-lg select-none'
            data-src={video}
            onClick={() => setSelected({ src: video, type: 'video' })}
            loop
          />
        ))}
        <Portal>
          <motion.div
            className='absolute top-0 left-0 z-10 w-screen bg-black h-screen overflow-hidden'
            animate={{ height: selected ? '100vh' : '0vh' }}
            initial={false}
          >
            {selected ? (
              selected.type === 'image' ? (
                <img
                  alt='Application screenshot'
                  className='max-w-screen w-screen object-contain max-h-screen relative'
                  src={selected.src}
                  loading='lazy'
                />
              ) : (
                <video
                  playsInline
                  loop
                  className='max-w-screen w-screen object-contain max-h-screen relative'
                  muted
                  autoPlay
                  data-src={selected.src}
                  poster={props.logoPath}
                />
              )
            ) : null}
            <div className='absolute top-5 right-5 h-[2rem] overflow-hidden mix-blend-exclusion z-20'>
              <motion.button
                onClick={() => setSelected(null)}
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
