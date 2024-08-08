import { useHookstate } from '@hookstate/core'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactElement, useEffect, useRef, useState } from 'react'
import {
  canNavigateState,
  seeMoreState,
  seeReviewsState,
  selectedProjectState,
} from '../state/project'
import _ from 'lodash'

export interface ProjectProps {
  title: string
  subtitle?: string
  date?: string
  by: string
  description: string
  href?: string | string[]
  reviews: { content: string; by: string }[]
  underDevelopment?: boolean
  projectInfoClassName?: string
  projectLink?: string
  technologies?: string[]
}

export default function ProjectInfo(props: ProjectProps): ReactElement {
  const selected = useHookstate(selectedProjectState)
  const seeMore = useHookstate(seeMoreState)
  const seeReviews = useHookstate(seeReviewsState)
  const canNavigate = useHookstate(canNavigateState)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showSites, setShowSites] = useState(false)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        left: 0,
      })
    }
  }, [selected])

  useEffect(() => {
    if (seeMore.value || seeReviews.value) canNavigate.set(false)
    else canNavigate.set(true)
  }, [seeMore, seeReviews])

  function onSelect() {
    seeMore.set((e) => !e)
    seeReviews.set(false)
  }

  return (
    <div
      id='project_info'
      className={classNames('duration-300 overflow-y-auto col-span-2 mt-4 mx-5 sm:pb-[50%] sm:max-h-[30vh] md:max-h-[60vh] md:pb-0 md:mx-0 md:my-auto -translate-y-2/3 sm:translate-y-0', props.projectInfoClassName)}
      ref={containerRef}
    >
      <h2 className={classNames('font-semibold leading-none whitespace-nowrap text-2xl', { 'absolute bottom-16': seeMore.value })}>
        {props.title}
      </h2>
      {props.date ? (
        <p className={classNames('text-neutral-500 text-sm', { 'absolute bottom-12': seeMore.value })}>{props.date}</p>
      ) : null}
      {props.subtitle
        ? (
          <motion.h2 animate={{ opacity: seeMore.value ? 0 : 1 }} className='normal-case text-neutral-800 mt-4 text-lg leading-none sm:whitespace-nowrap text-2xl'>
            {props.subtitle[0].toUpperCase() + props.subtitle.slice(1)}{' '}{props.projectLink? <span className='text-sm text-neutral-500'>(open source)</span> : null}
          </motion.h2>
        )
        : null}
      {props.underDevelopment
        ? <motion.h4 animate={{ opacity: seeMore.value ? 0 : 1 }} className='text-xs'>Under development</motion.h4>
        : null}
      <AnimatePresence initial={false} mode='popLayout'>
        {showSites && Array.isArray(props.href) ? (
          <motion.div key='sites' initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {props.href.map((r, i) => (
              <button
                className={classNames(
                  'group active:scale-90 scale-100 transition-transform duration-500',
                  'block mt-4',
                  seeMore.value ? 'absolute bottom-0' : 'relative '
                )}
                onClick={() => window.open(r, '_blank')}
              >
                Site{' '}{i + 1}
                <div className='absolute -bottom-1 left-0 w-full h-1 bg-black scale-x-100 group-hover:scale-x-0 origin-left transition-transform duration-500' />
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div key='info' initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <motion.p
              onMouseOver={() => canNavigate.set(false)}
              onMouseOut={() => canNavigate.set(true)}
              onMouseLeave={() => canNavigate.set(true)}
              animate={{ opacity: seeMore.value ? 0 : 1 }}
              className='text-neutral-800 max-w-sm mt-2'>{props.description}</motion.p>
            {
              props.technologies?.length ? (
                <motion.div animate={{ opacity: seeMore.value ? 0 : 1 }} className="mt-4">
                  <h3 className='text-md'>Technologies</h3>
                  <div className="flex text-sm items-center gap-y-0 gap-x-2 flex-wrap max-w-[30rem]">
                    {props.technologies.map((r, i) => (
                      <p key={i}>{r}</p>
                    ))}
                  </div>
                </motion.div>
              ) : null
            }
          </motion.div>
        )}
      </AnimatePresence>

      <div className='flex items-center gap-4 overflow-hidden relative'>
        <motion.button
          initial={false}
          animate={{ y: seeReviews.value ? 50 : 0 }}
          className={classNames(
            'group active:scale-90 scale-100 transition-transform duration-500',
            'block my-4',
            'relative'
          )}
          onClick={onSelect}
        >
          {seeMore.value ? 'Go back' : 'See more'}
          <div className='absolute -bottom-1 left-0 w-full h-1 bg-black scale-x-100 group-hover:scale-x-0 origin-left transition-transform duration-500' />
        </motion.button>
        {props.reviews.length
          ? (
            <motion.button
              initial={false}
              animate={{ y: seeMore.value ? 50 : 0 }}
              className={classNames(
                'relative group active:scale-90 scale-100 transition-transform duration-500',
                'block my-4',
              )}
              onClick={() => (seeReviews.set((e) => !e), seeMore.set(false))}
            >
              {seeReviews.value ? 'Hide' : 'See'} reviews
              <div className='absolute -bottom-1 left-0 w-full h-1 bg-black scale-x-100 group-hover:scale-x-0 origin-left transition-transform duration-500' />
            </motion.button>
          )
          : null}
        {props.href?.length
          ? (
            <motion.button
              initial={false}
              animate={{ y: seeMore.value ? 50 : 0 }}
              className={classNames(
                'group active:scale-90 scale-100 transition-transform duration-500',
                'block my-4',
                seeMore.value ? 'absolute bottom-0 left-20' : 'relative '
              )}
              onClick={() => typeof props.href === 'string' ? window.open(props.href, '_blank') : setShowSites(e => !e)}
            >
              {typeof props.href === 'string' ? 'Visit site' : `${!showSites ? 'Show' : 'Collapse'} sites`}
              <div className='absolute -bottom-1 left-0 w-full h-1 bg-black scale-x-100 group-hover:scale-x-0 origin-left transition-transform duration-500' />
            </motion.button>
          )
          : null}
        {props.projectLink ? (
          <motion.button
            initial={false}
            animate={{ opacity: seeMore.value ? 0 : 1 }}
            className={classNames(
              'group active:scale-90 scale-100 transition-transform duration-500',
              'block my-4',
              'relative'
            )}
            onClick={() => window.open(props.projectLink, '_blank')}
          >
            Open code repository
            <div className='absolute -bottom-1 left-0 w-full h-1 bg-black scale-x-100 group-hover:scale-x-0 origin-left transition-transform duration-500' />
          </motion.button>
        ) : null}
      </div>
    </div >
  )
}
