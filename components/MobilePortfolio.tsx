'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './MobilePortfolio.module.css'
import MobileBackground from './MobileBackground'
import InteractiveTerminal from './InteractiveTerminal'
import ProjectSection from './ProjectSection'
import { projects, siteLinks } from '../data/portfolio'

export default function MobilePortfolio() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')

  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const projectsHeaderRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLElement | null)[]>([])
  const footerRef = useRef<HTMLElement>(null)

  // Scroll progress tracker
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const scrollTop = window.scrollY
          const progress = (scrollTop / (documentHeight - windowHeight)) * 100
          setScrollProgress(progress)

          const sections = [
            { id: 'hero', ref: heroRef },
            { id: 'about', ref: aboutRef },
            { id: 'projects', ref: projectRefs.current[0] },
            { id: 'footer', ref: footerRef }
          ]

          for (const section of sections) {
            if (section.ref && section.ref instanceof HTMLElement) {
              const rect = section.ref.getBoundingClientRect()
              if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                setActiveSection(section.id)
                break
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sections = [heroRef.current, aboutRef.current, projectsHeaderRef.current, ...projectRefs.current, footerRef.current]
    sections.forEach(section => {
      if (section) {
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.wrapper}>
      <MobileBackground />

      {/* Scroll Progress Bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className={`${styles.hero} ${styles.animate}`}>
        <div className={styles.heroContent}>
          <div className={styles.heroTitle}>
            <h1 className={styles.name}>Paul Mutz</h1>
            <div className={styles.role}>Developer</div>
          </div>

          <InteractiveTerminal
            variant="mobile"
            headshotSlot={
              <Image
                src="/paul_headshot.PNG"
                alt="Paul Mutz"
                width={80}
                height={80}
              />
            }
          />

          <div className={styles.links}>
            <a href={siteLinks.github} target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
              <span className={styles.linkIcon}>&lt;/&gt;</span> GitHub
            </a>
            <a href={siteLinks.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
              <span className={styles.linkIcon}>in</span> LinkedIn
            </a>
            <a href={`mailto:${siteLinks.email}`} className={styles.linkCard}>
              <span className={styles.linkIcon}>@</span> Email
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className={`${styles.about} ${styles.animate}`}>
        <div className={styles.sectionHeader}>
          <h2>About Me</h2>
        </div>

        <div className={styles.aboutCard}>
          <div className={styles.cardGlow}></div>
          <div className={styles.aboutText}>
            <p>Software Developer & Systems Integrator at Alchemy Industrial.</p>
            <p>I bridge software and hardware — energy systems, web apps, and whatever problem needs solving next.</p>
          </div>
        </div>

        <div className={styles.statsBar}>
          <div className={styles.stat}><span className={styles.statValue}>5</span><span className={styles.statLabel}>Languages</span></div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}><span className={styles.statValue}>∞</span><span className={styles.statLabel}>Projects</span></div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}><span className={styles.statValue}>∞</span><span className={styles.statLabel}>Coffee</span></div>
        </div>

        <div className={styles.skillsGrid}>
          <div className={styles.skillCategory}>
            <h3>Languages</h3>
            <div className={styles.skillTags}>
              <span>Python</span>
              <span>JavaScript</span>
              <span>TypeScript</span>
              <span>Lua</span>
            </div>
          </div>
          <div className={styles.skillCategory}>
            <h3>Industrial/IoT</h3>
            <div className={styles.skillTags}>
              <span>Node-RED</span>
              <span>MQTT</span>
              <span>Victron</span>
              <span>Grafana</span>
              <span>Raspberry Pi</span>
            </div>
          </div>
          <div className={styles.skillCategory}>
            <h3>Web & Backend</h3>
            <div className={styles.skillTags}>
              <span>React</span>
              <span>Next.js</span>
              <span>Node.js</span>
              <span>Firebase</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <div className={styles.projectsWrapper}>
        <div ref={projectsHeaderRef} className={`${styles.projectsLabel} ${styles.animate}`}>
          Work
        </div>

        {projects.map((project, index) => (
          <section
            key={index}
            ref={(el) => { projectRefs.current[index] = el }}
            className={`${styles.project} ${styles.animate}`}
          >
            <ProjectSection project={project} index={index} variant="mobile" />
          </section>
        ))}
      </div>

      {/* Footer/Contact Section */}
      <section ref={footerRef} className={`${styles.footer} ${styles.animate}`}>
        <div className={styles.footerContent}>
          <div className={styles.footerHeader}>
            <h2>Let's Connect</h2>
          </div>

          <div className={styles.commandLine}>
            <span className={styles.prompt}>$</span>
            <span className={styles.command}>git commit -m "</span>
            <span className={styles.gitMessage}>Let's build something together</span>
            <span className={styles.command}>"</span>
          </div>

          <div className={styles.contactLinks}>
            <a href={siteLinks.github} target="_blank" rel="noopener noreferrer">
              <span>&lt;/&gt;</span>
              GitHub
            </a>
            <a href={siteLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <span>in</span>
              LinkedIn
            </a>
            <a href={`mailto:${siteLinks.email}`}>
              <span>@</span>
              Email
            </a>
          </div>

          <p className={styles.copyright}>© {new Date().getFullYear()} Paul Mutz</p>
        </div>
      </section>
    </div>
  )
}
