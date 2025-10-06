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
    skills: ['Python', 'Lua', 'JavaScript', 'TypeScript', 'Dart']
  },
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'Svelte', 'HTML', 'CSS']
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Firebase', 'REST APIs', 'Database Design']
  },
  {
    category: 'Tools & Other',
    skills: ['Git', 'FiveM Development', 'Game Server Architecture', 'Performance Optimization']
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
