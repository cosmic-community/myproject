import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CosmicBadge from '@/components/CosmicBadge'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Asma ul Husna - The 99 Beautiful Names of Allah',
  description: 'Explore the divine attributes of Allah through an interactive cosmic journey. Click on stars to discover the meaning and spiritual significance of each of Allah\'s 99 Beautiful Names.',
  keywords: 'Asma ul Husna, Allah names, Islamic spirituality, 99 names, divine attributes, Islam',
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