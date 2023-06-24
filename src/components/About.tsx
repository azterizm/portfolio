import { useHookstate } from '@hookstate/core'
import * as classNames from 'classnames'
import { motion } from 'framer-motion'
import type { ReactElement } from 'react'
import { canNavigateState, showAboutState } from '../state/project'
import Button from './Button'

export default function About(): ReactElement {
  const showAbout = useHookstate(showAboutState)
  const canNavigate = useHookstate(canNavigateState)
  return (
    <div className='w-screen h-screen p-5'>
      <div className='flex items-start flex-col text-7xl'>
        <h1>Abdullah</h1>
        <h1>Memon</h1>
      </div>
      <p className='text-lg max-w-md'>
        It all started from a line of code. Now I have grown into a full-stack
        developer who can also design. I can develop in all platforms like
        mobile, desktop, and the web. I am contuinusly sharpening my skills and
        staying on top of the latest trends.{' '}
      </p>
      <div
        className={classNames(
          'absolute top-5 right-5 transition-opacity',
          !showAbout.value ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        <Button onClick={() => (showAbout.set(false), canNavigate.set(true))}>
          Close
        </Button>
      </div>
      <motion.div
        animate={{ opacity: showAbout.value ? 1 : 0 }}
        transition={{ delay: !showAbout.value ? 0 : 0.7 }}
        className='absolute bottom-5 left-5 flex items-start flex-col gap-4'
      >
        <Button
          onClick={() => window.open(`mailto:abdielprime@gmail.com`, '_blank')}
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
            )
          }
        >
          Upwork
        </Button>
        <Button
          onClick={() =>
            window.open('https://www.freelancer.com/u/abdielprime', '_blank')
          }
        >
          Freelancer
        </Button>
        <Button
          onClick={() =>
            window.open('https://www.behance.net/abdielprime', '_blank')
          }
        >
          Behance
        </Button>
        <Button
          onClick={() =>
            window.open(
              'https://www.linkedin.com/in/abdullah-memon-66a45419a/',
              '_blank',
            )
          }
        >
          LinkedIn
        </Button>
        <Button
          onClick={() =>
            window.open('https://www.instagram.com/azterizm/', '_blank')
          }
        >
          Instagram
        </Button>
      </motion.div>
      <motion.span
        animate={{ opacity: showAbout.value ? 1 : 0 }}
        transition={{ delay: !showAbout.value ? 0 : 0.7 }}
        className='absolute left-[50%] -translate-x-[50%] bottom-5 text-neutral-400'
      >
        abdielprime@gmail.com
      </motion.span>
    </div>
  )
}
