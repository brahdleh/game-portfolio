'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full py-4 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-gray-800 bg-opacity-50 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
          PORTFOLIO & BLOG
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-white hover:text-blue-400 transition-colors font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link href="/games" className="text-white hover:text-blue-400 transition-colors font-medium">
                Games
              </Link>
            </li>
            <li>
              <Link href="/guides" className="text-white hover:text-blue-400 transition-colors font-medium">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-white hover:text-blue-400 transition-colors font-medium">
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 py-4">
          <nav className="container mx-auto px-6">
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="text-white hover:text-blue-400 transition-colors block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/games" 
                  className="text-white hover:text-blue-400 transition-colors block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Games
                </Link>
              </li>
              <li>
                <Link 
                  href="/guides" 
                  className="text-white hover:text-blue-400 transition-colors block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-white hover:text-blue-400 transition-colors block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

