import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import Head from 'next/head'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata = {
  title: 'BW Portfolio',
  description: 'A showcase of my game development and blog posts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <Head>
        {/* Add this to enable smooth scrolling */}
        <link href="/grid.svg" rel="preload" as="image" />
      </Head>
      <body className={`${spaceGrotesk.className} bg-gray-900 text-gray-100 min-h-screen flex flex-col`}>
        <div className="flex-grow flex flex-col relative">
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
