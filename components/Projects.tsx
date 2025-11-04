'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import styles from './Projects.module.css'

interface Project {
  title: string
  description: string
  technologies: string[]
  highlights: string[]
}

const projects: Project[] = [
  {
    title: 'Victron Energy Systems Integration',
    description: 'Systems integration work at Alchemy Industrial. Built custom 48V energy systems with Node-RED, MQTT, and Python for off-grid and industrial applications.',
    technologies: ['Python', 'Node-RED', 'MQTT', 'Victron', 'Grafana', 'Raspberry Pi'],
    highlights: [
      '48V modular BESS prototype with real-time monitoring',
      'Daly BMS ↔ Victron data bridge for protocol translation',
      'Smart thermal control system for battery enclosures',
      'Raspberry Pi edge deployments with Grafana dashboards'
    ]
  },
  {
    title: 'Full-Stack Web Applications',
    description: 'Modern web applications built with React and Next.js. From authentication to deployment, focused on shipping products that work.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Firebase', 'Node.js'],
    highlights: [
      'Real-time data sync with Firebase Firestore',
      'Authentication systems and user management',
      'Mobile-responsive design and UX',
      'Deployed on Vercel/Firebase and production-ready'
    ]
  },
  {
    title: 'FiveM Server Framework',
    description: 'Built an entire multiplayer game server ecosystem from the ground up. Custom framework, scripts, economy, admin tools - everything.',
    technologies: ['Lua', 'Svelte', 'JavaScript', 'MySQL'],
    highlights: [
      'Custom resource loading system that actually works',
      'Built admin panel from scratch',
      'Complex player economy with trading and persistence',
      'Handles 100+ players simultaneously without breaking'
    ]
  }
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.project-card',
              opacity: [0, 1],
              translateY: [50, 0],
              delay: anime.stagger(200),
              duration: 1000,
              easing: 'easeOutExpo',
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>Featured Projects</h2>
        <div className={styles.grid} ref={cardsRef}>
          {projects.map((project, index) => (
            <div key={index} className={`${styles.card} project-card`}>
              <div className={styles.cardContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                
                <div className={styles.highlights}>
                  {project.highlights.map((highlight, i) => (
                    <div key={i} className={styles.highlight}>
                      <span className={styles.checkmark}>✓</span>
                      {highlight}
                    </div>
                  ))}
                </div>

                <div className={styles.technologies}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
