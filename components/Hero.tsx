'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import CodeRain from './CodeRain'
import styles from './Hero.module.css'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
    })

    timeline
      .add({
        targets: titleRef.current,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1200,
      })
      .add({
        targets: subtitleRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
      }, '-=800')
      .add({
        targets: ctaRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
      }, '-=600')

    // Floating animation for the grid
    anime({
      targets: '.grid-dot',
      scale: [
        { value: 1.2, duration: 1000 },
        { value: 1, duration: 1000 }
      ],
      opacity: [
        { value: 0.8, duration: 1000 },
        { value: 0.3, duration: 1000 }
      ],
      delay: anime.stagger(50, { grid: [14, 8], from: 'center' }),
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad',
    })

    // Parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.scrollY
      const heroSection = document.querySelector('.hero-section') as HTMLElement
      if (heroSection && scrolled < window.innerHeight) {
        const opacity = 1 - (scrolled / window.innerHeight) * 1.5
        const translateY = scrolled * 0.5
        heroSection.style.opacity = `${Math.max(0, opacity)}`
        heroSection.style.transform = `translateY(${translateY}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className={`${styles.hero} hero-section`}>
      <CodeRain />
      <div className={styles.gridBackground}>
        {Array.from({ length: 112 }).map((_, i) => (
          <div key={i} className="grid-dot" />
        ))}
      </div>
      
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          Paul Mutz
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          Developer • Builder • Problem Solver
        </p>
        <p ref={subtitleRef} className={styles.description}>
          I turn ideas into working software. From game server architectures to modern web apps,
          I build things that actually work.
        </p>
        <div ref={ctaRef} className={styles.cta}>
          <a href="#projects" className={styles.ctaButton}>
            See What I've Built
          </a>
          <a href="#about" className={styles.ctaButtonSecondary}>
            More About Me
          </a>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  )
}
