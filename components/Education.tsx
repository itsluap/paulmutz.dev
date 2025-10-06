'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import styles from './Education.module.css'

export default function Education() {
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
              translateY: [40, 0],
              delay: anime.stagger(150),
              duration: 1000,
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
    <section id="education" className={styles.education} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>How I Learn</h2>
        <div className={styles.content} ref={contentRef}>
          <div className={styles.card}>
            <div className={styles.icon}>📚</div>
            <h3 className={styles.cardTitle}>Self-Taught</h3>
            <p className={styles.cardText}>
              No CS degree. No bootcamp. Just documentation, Stack Overflow, YouTube tutorials, 
              and a lot of trial and error. Building things is how I learn.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>💡</div>
            <h3 className={styles.cardTitle}>Learn by Doing</h3>
            <p className={styles.cardText}>
              I don't just watch tutorials - I build. Every project teaches me something new. 
              Made mistakes? Fixed them. Broke production? Learned from it.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>🚀</div>
            <h3 className={styles.cardTitle}>Always Exploring</h3>
            <p className={styles.cardText}>
              New framework drops? I'm trying it. New language looks interesting? I'm learning it. 
              The tech landscape changes fast, and I keep up by staying curious.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
