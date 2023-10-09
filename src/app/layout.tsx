import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Consider buy',
  description: 'Shop more efficiently.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon_180.png"></link>
      </head>
      <body className={inter.className}>
        <main>
          {children}
        </main>
        <footer>
          <small>&copy; 2023 Takumasa Sugiyama</small>
        </footer>
      </body>
    </html>
  )
}
