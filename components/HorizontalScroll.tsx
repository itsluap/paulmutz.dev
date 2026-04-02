'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './HorizontalScroll.module.css'
import VantaBackground from './VantaBackground'
import MobilePortfolio from './MobilePortfolio'
import InteractiveTerminal from './InteractiveTerminal'
import { codeSnippets, projects, siteLinks } from '../data/portfolio'

const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 1024
}

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [isMobileView, setIsMobileView] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 1024
    }
    return false
  })

  useEffect(() => {
    const checkMobile = () => {
      const mobile = isMobile()
      if (mobile !== isMobileView) {
        setIsMobileView(mobile)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [isMobileView])

  // Desktop horizontal scroll effect
  useEffect(() => {
    if (isMobileView || window.innerWidth <= 1024) return

    const handleScroll = () => {
      if (!containerRef.current) return

      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrolled / maxScroll

      const totalSections = 6
      const currentSection = Math.floor(progress * totalSections)
      setActiveSection(currentSection)

      const containerWidth = containerRef.current.scrollWidth
      const viewportWidth = window.innerWidth
      const maxTranslate = containerWidth - viewportWidth
      const translateX = -(progress * maxTranslate)

      containerRef.current.style.transform = `translateX(${translateX}px)`
    }

    if (containerRef.current && window.innerWidth > 1024) {
      const containerWidth = containerRef.current.scrollWidth
      document.body.style.height = `${containerWidth}px`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (document.body.style.height) {
        document.body.style.height = ''
      }
    }
  }, [isMobileView])

  return (
    <>
      <div className={styles.mobileOnly}>
        <MobilePortfolio />
      </div>
      <div className={styles.desktopOnly}>
        <div className={styles.wrapper}>
          <VantaBackground />
          <div className={styles.indicators}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`${styles.indicator} ${activeSection === i ? styles.active : ''}`}>
            <span className={styles.indicatorDot} />
          </div>
        ))}
      </div>

      <div ref={containerRef} className={styles.container}>

        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <InteractiveTerminal
              variant="desktop"
              headshotSlot={
                <Image
                  src="/paul_headshot.PNG"
                  alt="Paul Mutz"
                  width={100}
                  height={100}
                />
              }
            />

            <div className={styles.links}>
              <a href={siteLinks.github} target="_blank" rel="noopener noreferrer">
                <span className={styles.linkIcon}>&lt;/&gt;</span> GitHub
              </a>
              <a href={siteLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <span className={styles.linkIcon}>in</span> LinkedIn
              </a>
              <a href={`mailto:${siteLinks.email}`}>
                <span className={styles.linkIcon}>@</span> Email
              </a>
            </div>
          </div>
        </section>

        <section className={styles.about}>
          <div className={styles.aboutContent}>
            <div className={styles.codeWindow}>
              <div className={styles.codeHeader}>
                <span className={styles.fileName}>about.md</span>
              </div>
              <div className={styles.codeBody}>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>1</span>
                  <span className={styles.codeComment}># About Me</span>
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>2</span>
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>3</span>
                  Software Developer & Systems Integrator at Alchemy Industrial.
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>4</span>
                  I bridge software and hardware — energy systems,
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>5</span>
                  web apps, and whatever problem needs solving.
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>6</span>
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>7</span>
                  <span className={styles.codeComment}>## Tech Stack</span>
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>8</span>
                  <span className={styles.codeKeyword}>const</span> skills = {'{'}
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>9</span>
                  {'  '}languages: [<span className={styles.codeString}>'Python', 'JavaScript', 'TypeScript', 'Lua'</span>],
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>10</span>
                  {'  '}industrial: [<span className={styles.codeString}>'Node-RED', 'MQTT', 'Victron', 'Grafana'</span>],
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>11</span>
                  {'  '}web: [<span className={styles.codeString}>'React', 'Next.js', 'Firebase', 'Node.js'</span>],
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>12</span>
                  {'  '}coffee: <span className={styles.codeString}>'mass amounts'</span>
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>13</span>
                  {'}'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {projects.map((project, index) => (
          <section
            key={index}
            className={styles.work}
          >
            <div className={styles.workContent}>
              <div className={styles.projectHeader}>
                <div className={styles.projectNumber}>{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <h3>{project.title}</h3>
                  <span className={styles.year}>{project.year}</span>
                </div>
              </div>

              <div className={styles.projectGrid}>
                <div className={styles.projectInfo}>
                  <p className={styles.projectDescription}>{project.description}</p>

                  <div className={styles.techStack}>
                    {project.tech.map((t) => (
                      <span key={t} className={styles.techTag}>{t}</span>
                    ))}
                  </div>

                  {index === 0 && (
                    <a
                      href="https://professional.victronenergy.com/app/software-integrators-program"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.credential}
                    >
                      <Image
                        src="/integrator-program.png"
                        alt="Victron Energy Software Integrator Program"
                        width={300}
                        height={107}
                        className={styles.credentialLogo}
                      />
                      <div className={styles.credentialLabel}>Recommended Integrator</div>
                    </a>
                  )}
                </div>

                <div className={styles.codePreview}>
                  <div className={styles.codeHeader}>
                  <span className={styles.fileName}>
                    {project.codeExample === 'victron' ? 'victron_monitor.py' :
                     project.codeExample === 'react' ? 'useRealtimeData.js' :
                     'framework.lua'}
                  </span>
                  </div>
                  <pre className={styles.codeBlock}>
                    <code>{codeSnippets[project.codeExample]}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.commandLine}>
              <span className={styles.prompt}>$</span>
              <span className={styles.command}>git commit -m "</span>
              <span className={styles.gitMessage}>Let's build something together</span>
              <span className={styles.command}>"</span>
            </div>
            <div className={styles.footerLinks}>
              <a href={siteLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={siteLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={`mailto:${siteLinks.email}`}>Email</a>
            </div>
            <p className={styles.copyright}>© {new Date().getFullYear()} Paul Mutz</p>
          </div>
        </section>

        </div>
      </div>
      </div>
    </>
  )
}
