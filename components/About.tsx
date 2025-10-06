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
              I'm a developer who loves building things that work. Started with Python and Lua, 
              building everything from FiveM game servers to custom frameworks. Somewhere along the way, 
              I picked up React, Next.js, and a bunch of other tools that help me ship working software.
            </p>
            <p className={styles.text}>
              My approach? Learn what's needed, build it right, and make it work. Whether it's architecting 
              a game server from scratch or spinning up a modern web app with Firebase, I focus on solving 
              real problems with code that actually does what it's supposed to do.
            </p>
            <p className={styles.text}>
              Still learning, still building, always figuring out the next challenge.
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
