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
            I build software that solves real-world problems.
          </p>
          <p className={styles.text}>
            Software developer and systems integrator at Alchemy Industrial, working on custom Victron-based 
            48V energy systems. I also build full-stack web applications and have experience with complex 
            server infrastructure. Focus on Node-RED, MQTT, and Python for energy systems, React and Next.js 
            for web apps, and clean code that works reliably in production.
          </p>
          <p className={styles.text}>
            Self-taught developer who learns what's needed to solve real problems. No CS degree. Just 
            documentation, experimentation, and building solutions that actually work.
          </p>
          
          <div className={styles.skills}>
            <div className={styles.skillCategory}>
              <h3>Languages</h3>
              <p>Python, JavaScript, TypeScript, Lua</p>
            </div>
            <div className={styles.skillCategory}>
              <h3>Industrial/IoT</h3>
              <p>Node-RED, MQTT, Victron, Grafana, Raspberry Pi</p>
            </div>
            <div className={styles.skillCategory}>
              <h3>Web Development</h3>
              <p>React, Next.js, Node.js, Firebase, TypeScript</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
