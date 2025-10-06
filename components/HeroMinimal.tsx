'use client'

import { useEffect, useRef } from 'react'
import styles from './HeroMinimal.module.css'

export default function HeroMinimal() {
  const heroRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !textRef.current) return
      
      const scrolled = window.scrollY
      const heroHeight = heroRef.current.offsetHeight
      const progress = Math.min(scrolled / heroHeight, 1)
      
      // Fade and scale text as you scroll
      textRef.current.style.opacity = `${1 - progress}`
      textRef.current.style.transform = `scale(${1 - progress * 0.2})`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={heroRef} className={styles.hero}>
      <div ref={textRef} className={styles.content}>
        <h1 className={styles.name}>Paul Mutz</h1>
        <p className={styles.title}>Developer</p>
        <p className={styles.description}>
          Building functional software with Python, Lua, React, and Next.js
        </p>
      </div>
    </section>
  )
}
