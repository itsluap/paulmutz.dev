'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './VantaBackground.module.css'

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      import('vanta/dist/vanta.net.min').then((VANTA) => {
        import('three').then((THREE) => {
          const effect = (VANTA.default || VANTA)({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
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
        })
      })
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return <div ref={vantaRef} className={styles.vantaContainer} />
}