'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      
      if (anchor) {
        e.preventDefault()
        const href = anchor.getAttribute('href')
        if (href && href.startsWith('#')) {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return null
}
