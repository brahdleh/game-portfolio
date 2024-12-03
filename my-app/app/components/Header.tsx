import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md py-4">
      <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">PORTFOLIO & BLOG</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link href="/#games" className="hover:text-blue-400 transition-colors" scroll={false}>Games</Link></li>
            <li><Link href="/blog" className="hover:text-blue-400 transition-colors" >Blog</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

