import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata = {
  title: 'Game Developer Portfolio',
  description: 'A showcase of my game development projects and blog posts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.className} bg-gray-900 text-gray-100 min-h-screen flex flex-col scroll-smooth`}>
        <div className="flex-grow flex flex-col relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 opacity-50"></div>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow px-6 sm:px-10 md:px-16 lg:px-24">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
