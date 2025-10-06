'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      if (progressRef.current) {
        progressRef.current.style.width = `${scrollPercent}%`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={styles.progressContainer}>
      <div ref={progressRef} className={styles.progressBar} />
    </div>
  )
}
