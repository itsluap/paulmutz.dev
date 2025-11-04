'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './MobilePortfolio.module.css'
import MobileBackground from './MobileBackground'

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

export default function MobilePortfolio() {
  const [typedText, setTypedText] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const typewriterText = 'I build software that solves problems.'
  
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const projectsHeaderRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLElement | null)[]>([])
  const footerRef = useRef<HTMLElement>(null)

  // Typewriter effect
  useEffect(() => {
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
  }, [])

  // Scroll progress tracker - use requestAnimationFrame for better performance
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

          // Determine active section
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

    // Add scroll listener immediately
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
          
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span></span><span></span><span></span>
              </div>
              <span className={styles.terminalTitle}>terminal</span>
            </div>
            <div className={styles.terminalBody}>
              <p className={styles.terminalLine}>
                <span className={styles.prompt}>$</span> echo $MISSION
              </p>
              <p className={styles.typewriter}>
                {typedText}
                <span className={styles.cursor}>_</span>
              </p>
            </div>
          </div>
          
          <div className={styles.links}>
            <a href="https://github.com/itsluap" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
              <span className={styles.linkIcon}>&lt;/&gt;</span>
              <div>
                <div className={styles.linkTitle}>GitHub</div>
                <div className={styles.linkDesc}>View my code</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/paul-mutz-494859275" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
              <span className={styles.linkIcon}>in</span>
              <div>
                <div className={styles.linkTitle}>LinkedIn</div>
                <div className={styles.linkDesc}>Connect with me</div>
              </div>
            </a>
            <a href="mailto:paulmutzjr@icloud.com" className={styles.linkCard}>
              <span className={styles.linkIcon}>@</span>
              <div>
                <div className={styles.linkTitle}>Email</div>
                <div className={styles.linkDesc}>Get in touch</div>
              </div>
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
            <p>I bridge software and hardware through energy systems integration, build full-stack web applications, and have experience with complex server infrastructure.</p>
          </div>
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

      {/* Projects Section */}
      <div className={styles.projectsWrapper}>
        <div ref={projectsHeaderRef} className={`${styles.sectionHeader} ${styles.animate}`}>
          <h2>Projects</h2>
        </div>

        {projects.map((project, index) => (
          <section 
            key={index} 
            ref={(el) => { projectRefs.current[index] = el }}
            className={`${styles.project} ${styles.animate}`}
          >
            <div className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <span className={styles.projectNumber}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{project.title}</h3>
                  <span className={styles.projectYear}>{project.year}</span>
                </div>
              </div>
              
              <p className={styles.projectDescription}>{project.description}</p>
              
              <div className={styles.techStack}>
                {project.tech.map((tech) => (
                  <span key={tech} className={styles.techTag}>{tech}</span>
                ))}
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
            <a href="https://github.com/itsluap" target="_blank" rel="noopener noreferrer">
              <span>&lt;/&gt;</span>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/paul-mutz-494859275" target="_blank" rel="noopener noreferrer">
              <span>in</span>
              LinkedIn
            </a>
            <a href="mailto:paulmutzjr@icloud.com">
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
