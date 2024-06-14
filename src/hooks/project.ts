import { useHookstate } from '@hookstate/core'
import { useEffect } from 'react'
import { projects } from '../constants/project'
import {
  canNavigateState,
  hideScrollIndicatorState,
  selectedProjectState
} from '../state/project'

export function handleNavigation() {
  const canNavigate = useHookstate(canNavigateState)
  const hideScrollIndicator = useHookstate(hideScrollIndicatorState)
  const selectedProject = useHookstate(selectedProjectState)

  useEffect(() => {
    if (!canNavigate.value) return
    const max = projects.length - 1
    function goRight() {
      selectedProject.set((e) => (e >= max ? max : e + 1))
      if (!hideScrollIndicator.value) hideScrollIndicator.set(true)
    }
    function goLeft() {
      selectedProject.set((e) => (e <= 0 ? 0 : e - 1))
      if (!hideScrollIndicator.value) hideScrollIndicator.set(true)
    }
    function handleWheel(ev: WheelEvent) {
      if (!canNavigate.value) return
      if (ev.deltaY > 0) goRight()
      else if (ev.deltaY < 0) goLeft()
    }

    let xDown: null | number = null
    let yDown: null | number = null

    function getTouches(evt: any) {
      return evt.touches || evt.originalEvent.touches
    }

    function handleTouchStart(evt: any) {
      if (!canNavigate.value) return
      const firstTouch = getTouches(evt)[0]
      xDown = firstTouch.clientX
      yDown = firstTouch.clientY
    }

    function handleTouchEnd(evt: any) {
      if (!canNavigate.value) return
      if (!xDown || !yDown) {
        return
      }
      const xUp = evt.changedTouches[0].clientX
      const yUp = evt.changedTouches[0].clientY
      const xDiff = xDown - xUp
      const yDiff = yDown - yUp
      if (Math.abs(yDiff) > Math.abs(xDiff)) return
      if (xDiff > 60) {
        goRight()
      } else if (xDiff < -60) {
        goLeft()
      }
      xDown = null
    }

    document.addEventListener('wheel', handleWheel, false)
    document.addEventListener('touchstart', handleTouchStart, false)
    document.addEventListener('touchend', handleTouchEnd, false)
    return () => {
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [canNavigate])
}
