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
    title: 'FiveM Server Framework',
    description: 'Built an entire multiplayer game server ecosystem from the ground up. Custom framework, scripts, economy, admin tools - everything.',
    technologies: ['Lua', 'Svelte', 'JavaScript', 'HTML/CSS', 'MySQL'],
    highlights: [
      'Custom resource loading system that actually works',
      'Built admin panel from scratch (existing ones were terrible)',
      'Complex player economy with trading, inventory, and persistence',
      'Handles 100+ players simultaneously without breaking'
    ]
  },
  {
    title: 'Modern Web Apps',
    description: 'Full-stack applications built with React/Next.js and Firebase. From authentication to deployment, built to actually ship.',
    technologies: ['React', 'Next.js', 'Firebase', 'Node.js', 'TypeScript'],
    highlights: [
      'Real-time data sync with Firebase Firestore',
      'Auth that doesn\'t suck (Google, email, password reset)',
      'Mobile-responsive because people use phones',
      'Deployed on Vercel/Firebase Hosting and ready for users'
    ]
  },
  {
    title: 'Tinder Clone Experiment',
    description: 'Tried building a Tinder clone with Flutter and Dart. Ambitious? Yes. Learned a ton? Absolutely.',
    technologies: ['Dart', 'Flutter', 'Firebase'],
    highlights: [
      'Swipe mechanics and gesture recognition',
      'Real-time matching algorithm',
      'Cross-platform (iOS & Android from one codebase)',
      'Learned that dating app UX is harder than it looks'
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
