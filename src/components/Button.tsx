import * as classNames from 'classnames'
import * as _ from 'lodash'
import type { HTMLAttributes, ReactElement, ReactNode } from 'react'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export default function Button(props: ButtonProps): ReactElement {
  const buttonAttr = _.omit(props, 'children')
  return (
    <button
      {...buttonAttr}
      className={classNames(
        'relative group duration-500 active:scale-90 scale-100 transition',
        buttonAttr.className,
      )}
    >
      {props.children}
      <div className='absolute -bottom-1 left-0 w-full h-1 bg-black scale-x-100 group-hover:scale-x-0 origin-left transition-transform duration-500' />
    </button>
  )
}
