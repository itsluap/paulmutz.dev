'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import styles from './Footer.module.css'

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: footerRef.current?.children,
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(100),
              duration: 800,
              easing: 'easeOutQuad',
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.container} ref={footerRef}>
        <div className={styles.content}>
          <div className={styles.logo}>[PM]</div>
          <p className={styles.tagline}>Building things. Breaking things. Learning from both.</p>
        </div>

        <div className={styles.links}>
          <a href="https://github.com/itsluap" target="_blank" rel="noopener noreferrer" className={styles.link}>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/paul-mutz-494859275" target="_blank" rel="noopener noreferrer" className={styles.link}>
            LinkedIn
          </a>
          <a href="mailto:paulmutzjr@icloud.com" className={styles.link}>
            Email
          </a>
        </div>

        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} Paul Mutz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
