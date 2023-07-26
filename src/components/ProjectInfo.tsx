import { useHookstate } from '@hookstate/core'
import * as classNames from 'classnames'
import { motion } from 'framer-motion'
import { ReactElement, useEffect } from 'react'
import {
  canNavigateState,
  seeMoreState,
  seeReviewsState,
} from '../state/project'

export interface ProjectProps {
  title: string
  by: string
  description: string
  href?: string
  reviews: { content: string; by: string }[]
}

export default function ProjectInfo(props: ProjectProps): ReactElement {
  const seeMore = useHookstate(seeMoreState)
  const seeReviews = useHookstate(seeReviewsState)
  const canNavigate = useHookstate(canNavigateState)
  useEffect(() => {
    if (seeMore.value || seeReviews.value) canNavigate.set(false)
    else canNavigate.set(true)
  }, [seeMore, seeReviews])
  return (
    <div className='col-span-2 mt-4 mb-16 mx-5 md:mx-0 md:my-auto'>
      <h2 className='text-2xl'>{props.title}</h2>
      <p className='text-sm'>{props.by}</p>
      <p className='mt-4'>{props.description}</p>
      <div className='flex items-center gap-4 overflow-hidden'>
        <motion.button
          initial={false}
          animate={{ y: seeReviews.value ? 50 : 0 }}
          className={classNames(
            'relative group active:scale-90 scale-100 transition-transform duration-500',
            'block my-4',
          )}
          onClick={() => (seeMore.set((e) => !e), seeReviews.set(false))}
        >
          {seeMore.value ? 'Go back' : 'See more'}
          <div className='absolute -bottom-1 left-0 w-full h-1 bg-black scale-x-100 group-hover:scale-x-0 origin-left transition-transform duration-500' />
        </motion.button>
        {props.reviews.length ? (
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
        ) : null}
        {props.href ? (
          <motion.button
            initial={false}
            animate={{ y: seeMore.value ? 50 : 0 }}
            className={classNames(
              'relative group active:scale-90 scale-100 transition-transform duration-500',
              'block my-4',
            )}
            onClick={() => window.open(props.href, '_blank')}
          >
            Visit site
            <div className='absolute -bottom-1 left-0 w-full h-1 bg-black scale-x-100 group-hover:scale-x-0 origin-left transition-transform duration-500' />
          </motion.button>
        ) : null}
      </div>
    </div>
  )
}
