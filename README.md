# Developer Portfolio

A scroll-synced developer portfolio built with Next.js and TypeScript. Inspired by anime.js and Apple product pages where scroll position directly controls the animation—not triggered, but synchronized.

## Design Philosophy

- **Scroll-Synced**: Your scroll position controls the animation progress
- **Clean Typography**: Large, readable text that transforms as you scroll
- **Minimal**: No unnecessary decorations, just content that moves
- **Apple-Style**: Elements scale, fade, and blur based on viewport position

## Features

- **Hero Section**: Text scales down and moves up as you scroll (2x viewport height)
- **About Section**: Large text scales up and fades in based on scroll position
- **Work Section**: 
  - Sticky title that stays at top while projects scroll
  - Projects scale, blur, and fade based on their position in viewport
  - Each project animates independently
- **Scroll-Controlled**: All animations directly tied to scroll position, not triggered
- Responsive design
- Neon blue (#00d4ff) on black background

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **CSS Modules**: Scoped styling

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view.

## How It Works

The key difference from traditional portfolios: **scroll position = animation progress**

```javascript
// Example from HeroScrollSync.tsx
const scrollProgress = 1 - ((rect.top + sectionHeight) / (windowHeight + sectionHeight))
const scale = 1 - (scrollProgress * 0.5)
element.style.transform = `scale(${scale})`
```

Your scroll position directly calculates the scale, position, and opacity of elements. No triggers, no thresholds—pure scroll-driven animation.

## Customization

- `components/HeroScrollSync.tsx` - Name, title, scroll behavior
- `components/AboutScrollSync.tsx` - About text
- `components/WorkScrollSync.tsx` - Projects and experience
- `components/FooterClean.tsx` - Contact links
- `app/globals.css` - Colors and typography

## Color Palette

```css
--color-primary: #00d4ff      /* Neon blue */
--color-primary-bright: #4de4ff
--color-accent: #0099ff
--color-bg: #000000           /* Black background */
--color-text: #ffffff         /* White text */
--color-text-secondary: #9ca3af
```

## Structure

```
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
├── components/
│   ├── HeroMinimal.tsx  # Landing section
│   ├── AboutClean.tsx   # About section
│   ├── WorkClean.tsx    # Work/projects
│   ├── FooterClean.tsx  # Footer
│   └── Section.tsx      # Reusable section wrapper
└── package.json
```

## Deployment

Deploy to Vercel (recommended):
```bash
vercel deploy
```

Or build and deploy anywhere that supports Next.js:
```bash
npm run build
```

---

Built with Next.js and TypeScript