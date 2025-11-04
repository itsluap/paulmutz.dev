'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import styles from './Skills.module.css'

interface SkillCategory {
  category: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Lua']
  },
  {
    category: 'Industrial/IoT',
    skills: ['Node-RED', 'MQTT', 'Modbus', 'Victron VE.Direct', 'Raspberry Pi', 'GPIO']
  },
  {
    category: 'Monitoring & Data',
    skills: ['Grafana', 'InfluxDB', 'Real-time Data Logging', 'System Automation']
  },
  {
    category: 'Web Development',
    skills: ['React', 'Next.js', 'Node.js', 'Firebase', 'REST APIs']
  }
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.skill-card',
              opacity: [0, 1],
              scale: [0.8, 1],
              delay: anime.stagger(100, { grid: [2, 2], from: 'center' }),
              duration: 800,
              easing: 'easeOutElastic(1, .8)',
            })

            anime({
              targets: '.skill-item',
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(50, { start: 400 }),
              duration: 600,
              easing: 'easeOutQuad',
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
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>Skills & Technologies</h2>
        <div className={styles.grid} ref={gridRef}>
          {skillCategories.map((category, index) => (
            <div key={index} className={`${styles.card} skill-card`}>
              <h3 className={styles.categoryTitle}>{category.category}</h3>
              <div className={styles.skillList}>
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className={`${styles.skillItem} skill-item`}>
                    <span className={styles.skillDot}></span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
