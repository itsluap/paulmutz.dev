'use client'

import { useEffect, useRef } from 'react'
import styles from './WorkHorizontal.module.css'

const projects = [
  {
    title: 'FiveM Server Framework',
    year: '2021-Present',
    description: 'Built an entire multiplayer game server from scratch. Custom framework, Lua scripting engine, economy systems, and admin tools. Supports 100+ concurrent players.',
    tech: ['Lua', 'Svelte', 'MySQL', 'JavaScript'],
    metrics: ['100+ players', '50k+ lines', '30+ scripts'],
  },
  {
    title: 'Web Applications',
    year: '2020-Present',
    description: 'Full-stack applications using modern web technologies. Real-time features, authentication systems, cloud databases, and production deployments.',
    tech: ['React', 'Next.js', 'Firebase', 'TypeScript', 'Node.js'],
    metrics: ['10+ projects', 'Real-time data', 'Production'],
  },
  {
    title: 'Mobile Development',
    year: '2022',
    description: 'Cross-platform mobile development experiments. Built a dating app clone to learn Flutter and Dart.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    metrics: ['iOS + Android', 'Cross-platform', 'Firebase backend'],
  }
]

export default function WorkHorizontal() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !containerRef.current) return
      
      const section = sectionRef.current
      const container = containerRef.current
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight
      
      // Calculate scroll progress through the section (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (sectionHeight + windowHeight)
      ))
      
      // Calculate how far to translate (move projects left)
      const containerWidth = container.scrollWidth
      const viewportWidth = window.innerWidth
      const maxTranslate = containerWidth - viewportWidth
      const translateX = -(scrollProgress * maxTranslate)
      
      container.style.transform = `translateX(${translateX}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        <h2 className={styles.title}>Work</h2>
        <div ref={containerRef} className={styles.container}>
          {projects.map((project, index) => (
            <div key={index} className={styles.project}>
              <div className={styles.number}>{String(index + 1).padStart(2, '0')}</div>
              <div className={styles.content}>
                <div className={styles.header}>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
