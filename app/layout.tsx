import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = 'https://paulmutz.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Paul Mutz | Developer & Systems Integrator',
    template: '%s | Paul Mutz',
  },
  description:
    'Paul Mutz — developer and systems integrator at Alchemy Industrial. Building functional software with Python, Lua, React, and Next.js.',
  keywords: [
    'Paul Mutz',
    'paulmutz',
    'Alchemy Industrial',
    'developer',
    'systems integrator',
    'Python',
    'Lua',
    'React',
    'Next.js',
    'Victron',
    'energy systems',
  ],
  authors: [{ name: 'Paul Mutz', url: siteUrl }],
  creator: 'Paul Mutz',
  publisher: 'Paul Mutz',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Paul Mutz',
    title: 'Paul Mutz | Developer & Systems Integrator',
    description:
      'Developer and systems integrator. Python, Lua, React, Next.js, and energy systems.',
    images: [
      {
        url: '/paul_headshot.PNG',
        width: 800,
        height: 800,
        alt: 'Paul Mutz',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paul Mutz | Developer & Systems Integrator',
    description:
      'Developer and systems integrator. Python, Lua, React, Next.js, and energy systems.',
    images: ['/paul_headshot.PNG'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#paul-mutz`,
  name: 'Paul Mutz',
  givenName: 'Paul',
  familyName: 'Mutz',
  alternateName: ['paulmutz', 'itsluap'],
  url: siteUrl,
  mainEntityOfPage: siteUrl,
  image: `${siteUrl}/paul_headshot.PNG`,
  jobTitle: 'Developer & Systems Integrator',
  email: 'mailto:pmutz@alchemyindustrial.com',
  worksFor: {
    '@type': 'Organization',
    name: 'Alchemy Industrial',
    url: 'https://alchemyindustrial.com',
  },
  knowsAbout: [
    'Software Development',
    'Systems Integration',
    'Python',
    'Lua',
    'React',
    'Next.js',
    'Firebase',
    'Energy Systems',
    'Victron Energy',
    'Battery Energy Storage Systems',
    'MQTT',
  ],
  sameAs: [
    'https://www.linkedin.com/in/paul-mutz-494859275',
    'https://github.com/itsluap',
    'https://alchemyindustrial.com',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'Paul Mutz',
  description:
    'Personal site of Paul Mutz — developer and systems integrator at Alchemy Industrial.',
  publisher: { '@id': `${siteUrl}/#paul-mutz` },
  inLanguage: 'en-US',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
