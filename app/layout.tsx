import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Paul Mutz | Developer',
  description: 'Developer building functional software with Python, Lua, React, and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
