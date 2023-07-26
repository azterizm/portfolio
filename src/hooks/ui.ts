import { useEffect } from 'react'

export function removeLoader() {
  useEffect(() => {
    const loader = document.getElementById('loader')
    const root = document.getElementById('root')
    window.addEventListener('load', () => {
      if (loader) {
        loader.style.height = '0%'
      }
      if (root) {
        setTimeout(() => {
          root.style.opacity = '1'
        }, 400)
      }
    })
  }, [])
}
