'use client'

import { useEffect, useRef } from 'react'
import styles from './AboutScrollSync.module.css'

export default function AboutScrollSync() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !textRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Progress through the section
      const progress = 1 - ((rect.top + rect.height/2) / windowHeight)
      const clampedProgress = Math.max(0, Math.min(1, progress))
      
      // Scale up text as it enters view
      const scale = 0.95 + (clampedProgress * 0.05)
      textRef.current.style.transform = `scale(${scale})`
      textRef.current.style.opacity = `${0.4 + (clampedProgress * 0.6)}`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div ref={textRef} className={styles.content}>
          <p className={styles.large}>
            I build software that works. Self-taught developer focused on creating functional applications.
          </p>
          <p className={styles.text}>
            Started with Python and Lua, building game server infrastructure from scratch. Wrote custom 
            frameworks, scripting engines, and handled 100+ concurrent users. Moved into web development 
            with React and Next.js. Built full-stack applications from authentication to deployment.
          </p>
          <p className={styles.text}>
            No CS degree. No bootcamp. Just documentation, Stack Overflow, building projects, and learning from mistakes.
          </p>
          
          <div className={styles.skills}>
            <div className={styles.skillCategory}>
              <h3>Languages</h3>
              <p>Python, Lua, JavaScript, TypeScript, Dart</p>
            </div>
            <div className={styles.skillCategory}>
              <h3>Frontend</h3>
              <p>React, Next.js, Svelte, HTML/CSS</p>
            </div>
            <div className={styles.skillCategory}>
              <h3>Backend & Tools</h3>
              <p>Node.js, Firebase, MySQL, Git, FiveM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
