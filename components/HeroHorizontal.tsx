'use client'

import { useEffect, useRef } from 'react'
import styles from './HeroHorizontal.module.css'

export default function HeroHorizontal() {
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
      
      // Name: moves left and scales down
      if (nameRef.current) {
        const translateX = -(clampedProgress * 300)
        const scale = 1 - (clampedProgress * 0.3)
        nameRef.current.style.transform = `translateX(${translateX}px) scale(${scale})`
        nameRef.current.style.opacity = `${1 - clampedProgress * 0.5}`
      }
      
      // Title: moves right and fades
      if (titleRef.current) {
        const titleProgress = Math.max(0, (scrollProgress - 0.1) * 1.2)
        const translateX = titleProgress * 200
        titleRef.current.style.transform = `translateX(${translateX}px)`
        titleRef.current.style.opacity = `${1 - titleProgress * 0.7}`
      }
      
      // Description: moves up and fades
      if (descRef.current) {
        const descProgress = Math.max(0, (scrollProgress - 0.2) * 1.5)
        const translateY = -(descProgress * 100)
        descRef.current.style.transform = `translateY(${translateY}px)`
        descRef.current.style.opacity = `${1 - descProgress}`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
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
