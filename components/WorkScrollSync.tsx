'use client'

import { useEffect, useRef } from 'react'
import styles from './WorkScrollSync.module.css'

const projects = [
  {
    title: 'FiveM Server Framework',
    year: '2021-Present',
    description: 'Built an entire multiplayer game server from scratch. Custom framework, Lua scripting engine, economy systems, and admin tools. Supports 100+ concurrent players.',
    tech: ['Lua', 'Svelte', 'MySQL', 'JavaScript'],
    metrics: ['100+ players', '50k+ lines', '30+ scripts'],
    link: null
  },
  {
    title: 'Web Applications',
    year: '2020-Present',
    description: 'Full-stack applications using modern web technologies. Real-time features, authentication systems, cloud databases, and production deployments.',
    tech: ['React', 'Next.js', 'Firebase', 'TypeScript', 'Node.js'],
    metrics: ['10+ projects', 'Real-time data', 'Production'],
    link: null
  },
  {
    title: 'Mobile Development',
    year: '2022',
    description: 'Cross-platform mobile development experiments. Built a dating app clone to learn Flutter and Dart.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    metrics: ['iOS + Android', 'Cross-platform', 'Firebase backend'],
    link: null
  }
]

export default function WorkScrollSync() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      itemRefs.current.forEach((item, index) => {
        if (!item) return
        
        const rect = item.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Calculate when item enters and exits viewport
        const enterProgress = 1 - ((rect.top - windowHeight) / windowHeight)
        const exitProgress = 1 - (rect.bottom / windowHeight)
        
        // Item is in viewport when enterProgress > 0 and exitProgress < 1
        const inViewProgress = Math.max(0, Math.min(1, enterProgress))
        const outViewProgress = Math.max(0, exitProgress)
        
        // Combined progress (0 when entering, 1 when exiting)
        const totalProgress = Math.min(1, inViewProgress - outViewProgress)
        
        // Scale and fade based on position in viewport
        const scale = 0.9 + (totalProgress * 0.1)
        const opacity = Math.max(0.3, totalProgress)
        const blur = (1 - totalProgress) * 5
        
        item.style.transform = `scale(${scale})`
        item.style.opacity = `${opacity}`
        item.style.filter = `blur(${blur}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.stickyTitle}>
          <h2>Work</h2>
        </div>
        
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => { itemRefs.current[index] = el }}
            className={styles.project}
          >
            <div className={styles.projectHeader}>
              <h3>{project.title}</h3>
              <span className={styles.year}>{project.year}</span>
            </div>
            <p className={styles.description}>{project.description}</p>
            
            <div className={styles.metrics}>
              {project.metrics.map((metric, i) => (
                <span key={i}>{metric}</span>
              ))}
            </div>
            
            <div className={styles.tech}>
              {project.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                View Project →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
