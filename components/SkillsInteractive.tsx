'use client'

import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import styles from './SkillsInteractive.module.css'

interface Skill {
  name: string
  level: number
  category: 'languages' | 'frontend' | 'backend' | 'other'
}

const skills: Skill[] = [
  { name: 'Python', level: 90, category: 'languages' },
  { name: 'JavaScript', level: 88, category: 'languages' },
  { name: 'TypeScript', level: 82, category: 'languages' },
  { name: 'Lua', level: 85, category: 'languages' },
  { name: 'React', level: 85, category: 'frontend' },
  { name: 'Next.js', level: 88, category: 'frontend' },
  { name: 'Node-RED', level: 85, category: 'backend' },
  { name: 'MQTT', level: 88, category: 'backend' },
  { name: 'Node.js', level: 80, category: 'backend' },
  { name: 'Firebase', level: 85, category: 'backend' },
  { name: 'Grafana', level: 82, category: 'other' },
  { name: 'InfluxDB', level: 80, category: 'other' },
  { name: 'Raspberry Pi', level: 88, category: 'other' },
  { name: 'Victron Systems', level: 85, category: 'other' },
]

export default function SkillsInteractive() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            
            // Animate skill bars
            anime({
              targets: '.skill-bar-fill',
              width: (el: Element) => {
                return el.getAttribute('data-level') + '%'
              },
              delay: anime.stagger(50),
              duration: 1500,
              easing: 'easeOutExpo',
            })

            // Animate skill items
            anime({
              targets: '.skill-item-interactive',
              opacity: [0, 1],
              translateX: [-30, 0],
              delay: anime.stagger(30),
              duration: 800,
              easing: 'easeOutQuad',
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>Skills & Tech Stack</h2>
        
        <div className={styles.filters}>
          {['all', 'languages', 'frontend', 'backend', 'other'].map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.skillsGrid}>
          {filteredSkills.map((skill, index) => (
            <div key={skill.name + index} className={`${styles.skillItem} skill-item-interactive`}>
              <div className={styles.skillHeader}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillPercent}>{skill.level}%</span>
              </div>
              <div className={styles.skillBar}>
                <div 
                  className={`${styles.skillBarFill} skill-bar-fill`}
                  data-level={skill.level}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
