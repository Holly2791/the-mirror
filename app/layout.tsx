import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Mirror — Woman to Warrior',
  description: 'A 37-question assessment to reveal exactly where you are in your journey back to yourself.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#FAF7F2', color: '#181410' }}>
        {children}
      </body>
    </html>
  )
}
