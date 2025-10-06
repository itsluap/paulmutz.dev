'use client'

import { useEffect, useRef } from 'react'
import styles from './CodeRain.module.css'

export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const chars = '01'
    let frameCount = 0

    function draw() {
      if (!ctx || !canvas) return

      frameCount++
      if (frameCount % 2 !== 0) {
        requestAnimationFrame(draw)
        return
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = fontSize + 'px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        const gradient = ctx.createLinearGradient(x, y - fontSize * 10, x, y)
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0)')
        gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.5)')
        gradient.addColorStop(1, 'rgba(0, 212, 255, 1)')
        
        ctx.fillStyle = gradient
        ctx.fillText(text, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
