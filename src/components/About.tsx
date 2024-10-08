import { useHookstate } from '@hookstate/core'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import type { ReactElement } from 'react'
import { canNavigateState, showAboutState } from '../state/project'
import Button from './Button'

export default function About(): ReactElement {
  const showAbout = useHookstate(showAboutState)
  const canNavigate = useHookstate(canNavigateState)
  return (
    <div className='w-screen h-screen p-5'>
      <div className='flex items-start flex-col mt-12 sm:mt-0 text-3xl sm:text-5xl md:text-7xl'>
        <h1>Abdullah</h1>
        <h1>Memon</h1>
      </div>
      <p className='text-lg font-medium'>Freelance full-stack web developer</p>
      <p className='text-lg max-w-md mt-2'>
        It all started from a line of code. Now I have grown into a full-stack
        developer who can also design. I am continuously sharpening my skills and
        staying on top of the latest trends.{' '}
      </p>
      <div
        className={classNames(
          'absolute top-5 right-5 transition-opacity',
          !showAbout.value ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        <Button
          className={classNames(
            'delay-[1s]',
            showAbout.value ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => (showAbout.set(false), canNavigate.set(true))}
        >
          Close
        </Button>
      </div>
      <motion.div
        animate={{ opacity: showAbout.value ? 1 : 0 }}
        transition={{ delay: !showAbout.value ? 0 : 0.7 }}
        className='absolute sm:bottom-5 bottom-20 left-5 flex items-start sm:flex-col gap-4 flex-wrap'
      >
        <Button
          onClick={() => window.open(`mailto:contact@obad.work`, '_blank')}
        >
          Email
        </Button>
        <Button
          onClick={() => window.open('https://github.com/azterizm/', '_blank')}
        >
          GitHub
        </Button>
        <Button
          onClick={() =>
            window.open(
              'https://upwork.com/freelancers/abdullahmemon3',
              '_blank',
            )}
        >
          Upwork
        </Button>
        <Button
          onClick={() =>
            window.open('https://www.freelancer.com/u/abdielprime', '_blank')}
        >
          Freelancer
        </Button>
        <Button
          onClick={() =>
            window.open('https://instagram.com/azterizm', '_blank')}
        >
          Instagram
        </Button>
        <Button
          onClick={() =>
            window.open('https://www.linkedin.com/in/abdullah-memon-9565352a5/', '_blank')}
        >
          LinkedIn
        </Button>
        <Button
          onClick={() =>
            window.open('https://twitter.com/azterizm', '_blank')}
        >
          Twitter (X)
        </Button>
        <Button
          onClick={() =>
            window.open('https://www.behance.net/abdielprime', '_blank')}
        >
          Behance
        </Button>
        <Button
          onClick={() =>
            window.open('https://dribbble.com/abdielprime', '_blank')}
        >
          Dribbble
        </Button>

      </motion.div>
      <motion.span
        animate={{ opacity: showAbout.value ? 1 : 0 }}
        transition={{ delay: !showAbout.value ? 0 : 0.7 }}
        className='absolute left-5 sm:left-[50%] sm:-translate-x-[50%] bottom-5 text-neutral-400'
      >
        contact@obad.work
      </motion.span>
    </div>
  )
}
