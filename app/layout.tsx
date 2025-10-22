import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CosmicBadge from '@/components/CosmicBadge'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stellar Explorer - Interactive Galaxy Journey',
  description: 'Explore the cosmos through an interactive galaxy view. Click on stars to discover detailed astronomical information and stunning imagery.',
  keywords: 'astronomy, stars, galaxy, space, cosmos, interactive',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
        {/* Console capture script for dashboard debugging */}
        <Script src="/dashboard-console-capture.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}