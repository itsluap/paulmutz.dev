'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './VantaBackground.module.css'

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Skip Vanta on mobile - use CSS background instead
    if (isMobile === true) {
      // Clean up any existing effect
      if (vantaEffect) {
        vantaEffect.destroy()
        setVantaEffect(null)
      }
      return
    }

    if (isMobile === false && !vantaEffect && vantaRef.current) {
      import('vanta/dist/vanta.net.min').then((VANTA) => {
        import('three').then((THREE) => {
          // Double check ref still exists
          if (!vantaRef.current) return
          
          const effect = (VANTA.default || VANTA)({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00d4ff,
            backgroundColor: 0x121212,
            points: 8,
            maxDistance: 22,
            spacing: 16,
            showDots: true
          })
          setVantaEffect(effect)
        }).catch((err) => {
          console.warn('Failed to load Three.js:', err)
        })
      }).catch((err) => {
        console.warn('Failed to load Vanta:', err)
      })
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy()
      }
    }
  }, [vantaEffect, isMobile])

  // Wait for hydration
  if (isMobile === null) {
    return <div className={styles.vantaContainer} style={{ background: '#000000' }} />
  }

  return (
    <>
      {/* Desktop: Vanta.js background */}
      {isMobile === false && <div ref={vantaRef} className={styles.vantaContainer} />}
      
      {/* Mobile: Lightweight CSS animated background */}
      {isMobile === true && (
        <div className={styles.mobileBackground}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gradientOrb3}></div>
          <div className={styles.gridOverlay}></div>
        </div>
      )}
    </>
  )
}