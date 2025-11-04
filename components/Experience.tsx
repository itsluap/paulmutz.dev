'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import styles from './Experience.module.css'

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string[]
  technologies: string[]
}

const experiences: ExperienceItem[] = [
  {
    title: 'Software Developer / Systems Integrator',
    company: 'Alchemy Industrial',
    period: '2024 - Present',
    description: [
      'Bridge software and hardware through custom Victron-based 48V energy systems',
      'Build Node-RED, MQTT, and Python integrations to automate data flow and improve system visibility',
      'Deploy Raspberry Pi edge solutions for local data logging, fallback operation, and Grafana monitoring',
      'Developed 48V modular BESS prototype, Daly BMS ↔ Victron data bridge, and smart thermal control systems'
    ],
    technologies: ['Python', 'Node-RED', 'MQTT', 'Grafana', 'InfluxDB', 'Raspberry Pi', 'Victron', 'Modbus']
  },
  {
    title: 'Web Developer',
    company: 'Personal & Client Projects',
    period: '2020 - Present',
    description: [
      'Built full-stack web apps with React and Next.js - from idea to deployment',
      'Set up Firebase backends for auth, real-time data, and hosting',
      'Experimented with various technologies and frameworks through personal projects',
      'Shipped working products that people actually use'
    ],
    technologies: ['React', 'Next.js', 'Firebase', 'Node.js', 'TypeScript']
  }
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: itemsRef.current?.children,
              opacity: [0, 1],
              translateX: [-50, 0],
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
    <section id="experience" className={styles.experience} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>Experience</h2>
        <div className={styles.timeline} ref={itemsRef}>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineMarker}></div>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.jobTitle}>{exp.title}</h3>
                    <p className={styles.company}>{exp.company}</p>
                  </div>
                  <span className={styles.period}>{exp.period}</span>
                </div>
                <ul className={styles.description}>
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className={styles.technologies}>
                  {exp.technologies.map((tech) => (
                    <span key={tech} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
