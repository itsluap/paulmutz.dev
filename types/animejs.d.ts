declare module 'animejs' {
  interface AnimeInstance {
    play(): void
    pause(): void
    restart(): void
    reverse(): void
    seek(time: number): void
    finished: Promise<void>
    add(params: AnimeParams, offset?: string | number): AnimeInstance
  }

  interface AnimeParams {
    targets?: any
    [key: string]: any
  }

  interface AnimeStatic {
    (params: AnimeParams): AnimeInstance
    timeline(params?: AnimeParams): AnimeInstance
    stagger(value: number | [number, number], options?: any): any
    random(min: number, max: number): number
  }

  const anime: AnimeStatic
  export default anime
}
