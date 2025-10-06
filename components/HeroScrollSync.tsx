'use client'

import { useEffect, useRef } from 'react'
import styles from './HeroScrollSync.module.css'

export default function HeroScrollSync() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight
      
      // Calculate progress through the section (0 to 1)
      const scrollProgress = 1 - ((rect.top + sectionHeight) / (windowHeight + sectionHeight))
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress))
      
      // Name: starts large, scales down and moves up as you scroll
      if (nameRef.current) {
        const scale = 1 - (clampedProgress * 0.5)
        const translateY = -(clampedProgress * 200)
        nameRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`
        nameRef.current.style.opacity = `${1 - clampedProgress * 0.7}`
      }
      
      // Title: fades in slightly after, moves up
      if (titleRef.current) {
        const titleProgress = Math.max(0, (scrollProgress - 0.1) * 1.5)
        const translateY = -(titleProgress * 150)
        titleRef.current.style.transform = `translateY(${translateY}px)`
        titleRef.current.style.opacity = `${1 - titleProgress * 0.8}`
      }
      
      // Description: fades in last, moves up slower
      if (descRef.current) {
        const descProgress = Math.max(0, (scrollProgress - 0.2) * 1.8)
        const translateY = -(descProgress * 100)
        descRef.current.style.transform = `translateY(${translateY}px)`
        descRef.current.style.opacity = `${1 - descProgress}`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.content}>
        <h1 ref={nameRef} className={styles.name}>
          Paul Mutz
        </h1>
        <div ref={titleRef} className={styles.title}>
          Developer
        </div>
        <div ref={descRef} className={styles.description}>
          <p>Building functional software</p>
          <p className={styles.tech}>Python • Lua • React • Next.js • Firebase</p>
          <div className={styles.links}>
            <a href="https://github.com/itsluap" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className={styles.divider}>•</span>
            <a href="https://www.linkedin.com/in/paul-mutz-494859275" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className={styles.divider}>•</span>
            <a href="mailto:paulmutzjr@icloud.com">Email</a>
          </div>
        </div>
      </div>
    </section>
  )
}
