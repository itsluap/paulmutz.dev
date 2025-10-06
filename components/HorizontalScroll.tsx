'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './HorizontalScroll.module.css'
import VantaBackground from './VantaBackground'

const codeSnippets: Record<string, string> = {
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
end`,
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
  python: `# Game server monitoring
async def monitor_server_health():
    while True:
        players = await get_player_count()
        cpu = psutil.cpu_percent()
        memory = psutil.virtual_memory().percent
        
        if players > 100:
            await scale_resources()
        
        await asyncio.sleep(5)`
}

const projects = [
  {
    title: 'FiveM Server Framework',
    year: '2021-2023',
    description: 'Built custom multiplayer game server infrastructure. Developed Lua scripting framework, economy systems, and admin tools for roleplay gaming community.',
    tech: ['Lua', 'JavaScript', 'MySQL'],
    codeExample: 'lua'
  },
  {
    title: 'Web Applications',
    year: '2020-Present',
    description: 'Full-stack web applications using modern frameworks. Focus on responsive design, real-time features, and cloud infrastructure.',
    tech: ['React', 'Next.js', 'TypeScript', 'Firebase'],
    codeExample: 'react'
  },
  {
    title: 'Learning Projects',
    year: '2022-Present',
    description: 'Experimental projects to explore new technologies. Built mobile apps with Flutter, automation scripts with Python, and various web tools.',
    tech: ['Flutter', 'Python', 'Dart'],
    codeExample: 'python'
  }
]

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [typedText, setTypedText] = useState('')
  const typewriterText = 'I build software that ships.'

  useEffect(() => {
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

    if (containerRef.current) {
      const containerWidth = containerRef.current.scrollWidth
      document.body.style.height = `${containerWidth}px`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.height = ''
    }
  }, [])

  useEffect(() => {
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
  }, [activeSection, typewriterText])

  return (
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
                <div className={styles.title}>Developer</div>
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
                  Self-taught developer who builds software that works.
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>4</span>
                  Started with Python and Lua, building game servers from scratch.
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>5</span>
                  Now shipping full-stack apps with React, Next.js, and Firebase.
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
                  {'  '}languages: [<span className={styles.codeString}>'Python', 'Lua', 'JavaScript', 'TypeScript'</span>],
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>10</span>
                  {'  '}frontend: [<span className={styles.codeString}>'React', 'Next.js', 'Svelte'</span>],
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>11</span>
                  {'  '}backend: [<span className={styles.codeString}>'Node.js', 'Firebase', 'MySQL'</span>],
                </p>
                <p className={styles.codeLine}>
                  <span className={styles.lineNumber}>12</span>
                  {'  '}learning: <span className={styles.codeString}>'Always'</span>
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
          <section key={index} className={styles.work}>
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
                      {project.codeExample === 'lua' ? 'framework.lua' : 
                       project.codeExample === 'react' ? 'useRealtimeData.js' : 
                       'monitor.py'}
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
  )
}