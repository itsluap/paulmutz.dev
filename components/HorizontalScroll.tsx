'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './HorizontalScroll.module.css'
import VantaBackground from './VantaBackground'
import MobilePortfolio from './MobilePortfolio'

const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 1024
}

const codeSnippets: Record<string, string> = {
  victron: `# Victron Energy Systems
def monitor_battery_state():
    data = {
        'voltage': read_victron_voltage(),
        'current': read_victron_current(),
        'soc': calculate_soc(),
        'temp': read_temperature()
    }
    
    mqtt_client.publish('bess/state', data)
    optimize_charging(data)`,
  react: `// Real-time hook with Firebase
const useRealtimeData = (path) => {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    const ref = database.ref(path)
    ref.on('value', (snapshot) => {
      setData(snapshot.val())
    })
    return () => ref.off()
  }, [path])
  
  return data
}`,
  lua: `-- FiveM Server Framework
local Framework = {}
Framework.Players = {}

function Framework:RegisterPlayer(source, data)
    self.Players[source] = {
        id = source,
        name = data.name,
        money = data.money or 0,
        inventory = data.inventory or {}
    }
    TriggerClientEvent('framework:playerLoaded', source)
end`
}

const projects = [
  {
    title: 'Victron Energy Systems',
    year: '2024-Present',
    description: 'Systems integration at Alchemy Industrial. Built custom 48V energy systems, BMS bridges, thermal control, and edge monitoring with Grafana dashboards.',
    tech: ['Python', 'Node-RED', 'MQTT', 'Victron', 'Grafana'],
    codeExample: 'victron'
  },
  {
    title: 'Web Applications',
    year: '2020-Present',
    description: 'Full-stack web applications using modern frameworks. Real-time features, authentication systems, and cloud infrastructure.',
    tech: ['React', 'Next.js', 'TypeScript', 'Firebase'],
    codeExample: 'react'
  },
  {
    title: 'FiveM Server Framework',
    year: '2021-2023',
    description: 'Built custom multiplayer game server infrastructure. Developed Lua scripting framework, economy systems, and admin tools.',
    tech: ['Lua', 'JavaScript', 'Svelte', 'MySQL'],
    codeExample: 'lua'
  }
]

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [typedText, setTypedText] = useState('')
  const typewriterText = 'I build software that solves problems.'
  // Check mobile immediately to prevent any desktop logic from running
  const [isMobileView, setIsMobileView] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 1024
    }
    return false
  })

  // Check if mobile on mount and conditionally render
  useEffect(() => {
    const checkMobile = () => {
      const mobile = isMobile()
      if (mobile !== isMobileView) {
        setIsMobileView(mobile)
      }
    }
    
    // Check immediately on mount in case initial state was wrong
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [isMobileView])

  // Desktop horizontal scroll effect
  useEffect(() => {
    // Extra safety check - never run on mobile
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

    // Only set body height on desktop
    if (containerRef.current && window.innerWidth > 1024) {
      const containerWidth = containerRef.current.scrollWidth
      document.body.style.height = `${containerWidth}px`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      // Always clean up body height
      if (document.body.style.height) {
        document.body.style.height = ''
      }
    }
  }, [isMobileView])

  // Typewriter effect
  useEffect(() => {
    if (isMobileView) return
    if (activeSection !== 0) return

    let index = 0
    const interval = setInterval(() => {
      if (index <= typewriterText.length) {
        setTypedText(typewriterText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [activeSection, typewriterText, isMobileView])

  // Always render mobile portfolio, but hide with CSS on desktop for SSR compatibility
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
            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <div className={styles.terminalDots}>
                  <span></span><span></span><span></span>
                </div>
                <span className={styles.terminalTitle}>~/portfolio</span>
              </div>
              <div className={styles.terminalBody}>
                <p className={styles.terminalLine}>
                  <span className={styles.prompt}>$</span> whoami
                </p>
                <h1 className={styles.name}>Paul Mutz</h1>
                <p className={styles.terminalLine}>
                  <span className={styles.prompt}>$</span> cat role.txt
                </p>
                <div className={styles.title}>Developer & Systems Integrator</div>
                <p className={styles.terminalLine}>
                  <span className={styles.prompt}>$</span> echo $MISSION
                </p>
                <p className={styles.typewriter}>{typedText}<span className={styles.cursor}>_</span></p>
              </div>
            </div>
            
            <div className={styles.links}>
              <a href="https://github.com/itsluap" target="_blank" rel="noopener noreferrer">
                <span className={styles.linkIcon}>&lt;/&gt;</span> GitHub
              </a>
              <a href="https://www.linkedin.com/in/paul-mutz-494859275" target="_blank" rel="noopener noreferrer">
                <span className={styles.linkIcon}>in</span> LinkedIn
              </a>
              <a href="mailto:paulmutzjr@icloud.com">
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
                  I bridge software and hardware, build web applications, and
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>5</span>
                  solve problems with code that works in production.
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
                  {'  '}focus: <span className={styles.codeString}>'Building solutions that work'</span>
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
              <a href="https://github.com/itsluap" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/paul-mutz-494859275" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="mailto:paulmutzjr@icloud.com">Email</a>
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