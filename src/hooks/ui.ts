import { useEffect } from 'react'

export function removeLoader() {
  useEffect(() => {
    const loader = document.getElementById('loader')
    const root = document.getElementById('root')
    let done = false
    function handle() {
      if (done) return
      if (loader) {
        loader.style.height = '0%'
      }
      if (root) {
        setTimeout(() => {
          root.style.opacity = '1'
        }, 400)
      }
      done = true
    }
    window.addEventListener('load', () => {
      handle()
    })
    setTimeout(() => {
      handle()
    }, 4000)
  }, [])
}
