declare module 'vanta/dist/vanta.net.min' {
  export interface VantaEffect {
    destroy: () => void
  }

  export default function NET(options: {
    el: HTMLElement | null
    THREE?: any
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    scale?: number
    scaleMobile?: number
    color?: number
    backgroundColor?: number
    points?: number
    maxDistance?: number
    spacing?: number
    showDots?: boolean
    backgroundAlpha?: number
    lineColor?: number
    dotColor?: number
    [key: string]: any
  }): VantaEffect
}

declare module 'vanta/dist/vanta.waves.min' {
  export interface VantaEffect {
    destroy: () => void
  }

  export default function WAVES(options: {
    el: HTMLElement | null
    THREE?: any
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    scale?: number
    scaleMobile?: number
    color?: number
    shininess?: number
    waveHeight?: number
    waveSpeed?: number
    zoom?: number
    [key: string]: any
  }): VantaEffect
}
