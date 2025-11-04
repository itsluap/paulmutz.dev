'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import styles from './About.module.css'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: contentRef.current?.children,
              opacity: [0, 1],
              translateY: [30, 0],
              delay: anime.stagger(150),
              duration: 1000,
              easing: 'easeOutExpo',
            })

            // Add rotation animation to highlight numbers
            anime({
              targets: '.highlight-number',
              innerHTML: [0, (el: Element) => {
                const targetText = el.getAttribute('data-target')
                if (!targetText) return '0'
                if (targetText === '∞' || targetText === '100%') return targetText
                return parseInt(targetText)
              }],
              round: 1,
              duration: 2000,
              delay: 800,
              easing: 'easeOutExpo',
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
  }, [])

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <div ref={contentRef}>
          <h2 className={styles.title}>About Me</h2>
          <div className={styles.content}>
            <p className={styles.text}>
              I'm a software developer and systems integrator at Alchemy Industrial, where I bridge 
              software and hardware through custom Victron-based 48V energy systems. I also build 
              full-stack web applications and have experience with game server development.
            </p>
            <p className={styles.text}>
              At Alchemy, I work with Node-RED, MQTT, and Python to automate data flow and improve 
              system visibility. I build Raspberry Pi edge deployments, Grafana dashboards for monitoring, 
              and custom bridges between hardware systems. Outside of that, I build modern web apps with 
              React, Next.js, and Firebase.
            </p>
            <p className={styles.text}>
              Self-taught developer who learns what's needed to solve real-world problems. Whether it's 
              energy systems integration, web applications, or complex server infrastructure, I focus on 
              building solutions that actually work in production.
            </p>
            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <span className={`${styles.highlightNumber} highlight-number`} data-target="5">0</span>
                <span className={styles.highlightLabel}>Languages</span>
              </div>
              <div className={styles.highlight}>
                <span className={`${styles.highlightNumber} highlight-number`} data-target="∞">∞</span>
                <span className={styles.highlightLabel}>Projects</span>
              </div>
              <div className={styles.highlight}>
                <span className={`${styles.highlightNumber} highlight-number`} data-target="100%">100%</span>
                <span className={styles.highlightLabel}>Self-Taught</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
