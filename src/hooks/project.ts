import { useHookstate } from '@hookstate/core'
import { useEffect } from 'react'
import { projects } from '../constants/project'
import { canNavigateState, selectedProjectState } from '../state/project'

export function handleNavigation() {
  const canNavigate = useHookstate(canNavigateState)
  const selectedProject = useHookstate(selectedProjectState)

  useEffect(() => {
    if (!canNavigate.value) return
    const max = projects.length - 1
    function goRight() {
      selectedProject.set((e) => (e >= max ? max : e + 1))
    }
    function goLeft() {
      selectedProject.set((e) => (e <= 0 ? 0 : e - 1))
    }
    function handleWheel(ev: WheelEvent) {
      if (!canNavigate.value) return
      if (ev.deltaY > 0) goRight()
      else if (ev.deltaY < 0) goLeft()
    }

    let xDown: null | number = null

    function getTouches(evt: any) {
      return evt.touches || evt.originalEvent.touches
    }

    function handleTouchStart(evt: any) {
      if (!canNavigate.value) return
      const firstTouch = getTouches(evt)[0]
      xDown = firstTouch.clientX
    }

    function handleTouchMove(evt: any) {
      if (!canNavigate.value) return
      if (!xDown) {
        return
      }
      const xUp = evt.touches[0].clientX
      const xDiff = xDown - xUp
      if (xDiff > 0) {
        goRight()
      } else {
        goLeft()
      }
      xDown = null
    }

    document.addEventListener('wheel', handleWheel, false)
    document.addEventListener('touchstart', handleTouchStart, false)
    document.addEventListener('touchmove', handleTouchMove, false)
    return () => {
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [canNavigate])
}
