import { hookstate } from '@hookstate/core'

export const seeMoreState = hookstate(false)
export const seeReviewsState = hookstate(false)
export const selectedProjectState = hookstate(0)
export const canNavigateState = hookstate(true)
export const showAboutState = hookstate(false)
export const hideScrollIndicatorState = hookstate(false)
export const testValueState = hookstate<any>('')
