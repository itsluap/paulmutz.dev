'use client'

import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import styles from './ProjectsInteractive.module.css'

interface Project {
  title: string
  description: string
  technologies: string[]
  highlights: string[]
  stats: { label: string; value: string }[]
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
    ],
    stats: [
      { label: 'Lines of Code', value: '50k+' },
      { label: 'Concurrent Players', value: '100+' },
      { label: 'Custom Scripts', value: '30+' }
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
    ],
    stats: [
      { label: 'Apps Built', value: '10+' },
      { label: 'Technologies', value: '8+' },
      { label: 'Deploy Time', value: '<5min' }
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
    ],
    stats: [
      { label: 'Platforms', value: '2' },
      { label: 'Features', value: '15+' },
      { label: 'Lessons Learned', value: '∞' }
    ]
  }
]

export default function ProjectsInteractive() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            
            anime({
              targets: '.project-card-interactive',
              opacity: [0, 1],
              translateY: [100, 0],
              rotateX: [10, 0],
              delay: anime.stagger(200, { from: 'center' }),
              duration: 1200,
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
  }, [hasAnimated])

  const handleMouseEnter = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    setHoveredIndex(index)
    const card = event.currentTarget
    
    anime({
      targets: card,
      scale: 1.05,
      duration: 300,
      easing: 'easeOutQuad',
    })
  }

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setHoveredIndex(null)
    const card = event.currentTarget
    
    anime({
      targets: card,
      scale: 1,
      duration: 300,
      easing: 'easeOutQuad',
    })
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    
    anime({
      targets: card,
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 300,
      easing: 'easeOutQuad',
    })
  }

  const handleMouseLeaveReset = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget
    
    anime({
      targets: card,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 600,
      easing: 'easeOutElastic(1, .6)',
    })
    
    setHoveredIndex(null)
  }

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>Featured Projects</h2>
        <p className={styles.subtitle}>Things I've built, broken, and learned from</p>
        
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div
              key={index}
              className={`${styles.card} project-card-interactive`}
              onMouseEnter={(e) => handleMouseEnter(index, e)}
              onMouseLeave={handleMouseLeaveReset}
              onMouseMove={handleMouseMove}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <div className={styles.stats}>
                    {project.stats.map((stat, i) => (
                      <div key={i} className={styles.stat}>
                        <span className={styles.statValue}>{stat.value}</span>
                        <span className={styles.statLabel}>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

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
              
              <div className={`${styles.cardGlow} ${hoveredIndex === index ? styles.active : ''}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
