'use client'

import GameCard from './components/GameCard'
import BlogPostCard from './components/BlogPostCard'
import UpdateCard from './components/UpdateCard'
import InteractiveBackground from './components/game/InteractiveBackground'
import Link from 'next/link'

const games = [
  { id: 1, title: 'Idle Revelations', image: '/flasks.png', description: 'Incremental clicker following our discovery of the universe through the ages.', url:'idle_revelations' },
  { id: 2, title: 'Desktop Miner', image: '/desktop_miner.png', description: 'Browser based mining game to kill the time.', url:'desktop_miner' },
]

const blogPosts = [
  { id: 1, title: 'Cursor + Unity: my experience so far...', date: '2024-11-15', 'image': '/cursor.png', excerpt: 'AI is now part and parcel of web development, but how well does it work in mobile game development?', url:'cursor_plus_unity_dec_24' },
]

const recentUpdates = [
  { id: 1, title: 'Idle Revelations: Core Functionality Complete', date: '2024-11-25', type: 'game', url:'idle_revelations' },
  { id: 2, title: 'Blog Post: Cursor + Unity: my experience so far...', date: '2024-11-15', type: 'blog', url:'cursor_plus_unity_dec_24' },
  { id: 3, title: 'IDLE Revelations Begins', date: '2024-6-05', type: 'game', url:'idle_revelations' },
]

interface SectionHeaderProps {
  badgeText: string;
  title: string;
  description: string;
  badgeColor?: string;
  gradient?: string;
}

// Reusable section header component
const SectionHeader : React.FC<SectionHeaderProps> = ({ 
  badgeText, 
  title, 
  description, 
  badgeColor = 'blue', 
  gradient = 'from-blue-300 to-blue-100' 
}) => (
  <div className="text-center mb-16">
    <span className={`inline-block px-3 py-1 bg-${badgeColor}-900/50 text-${badgeColor}-300 text-sm font-medium rounded-full mb-4 border border-${badgeColor}-800`}>
      {badgeText}
    </span>
    <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}>
      {title}
    </h2>
    <div className={`w-24 h-1 bg-gradient-to-r from-${badgeColor}-400 to-${badgeColor}-600 mx-auto mb-6 rounded-full`}></div>
    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
      {description}
    </p>
  </div>
);

export default function Home() {
  return (
    <div className="relative">
      
      <InteractiveBackground />
      
      {/* Hero Section with improved background */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-indigo-900/90 to-grey-900/90 z-10 opacity-50"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-40 z-5"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 text-center z-20">
          <div className="max-w-2xl mx-auto bg-gray-900/80 backdrop-blur-md p-8 rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.3)] border border-blue-500/50">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">Bradley Westwood</h1>
            <p className="text-xl mb-8 text-blue-400 font-semibold">Game Developer</p>
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-200">
              Come along with me on this journey to deliver fun and novel additions to the incremental genre.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#games" className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] relative overflow-hidden">
                <span className="relative z-10">View My Games</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              <Link href="#recent-updates" className="group px-6 py-3 bg-gray-800 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(107,114,128,0.5)] border border-gray-700">
                <span className="relative z-10">Recent Updates</span>
                <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Games Section - improved background */}
      <section id="games" className="py-24 md:py-32 relative">
        {/* Improved background effects for games section */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20 z-0"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent z-0"></div>
        <div className="absolute inset-0 overflow-hidden z-0">
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader 
            badgeText="EXPLORE" 
            title="My Games"
            description="Explore my collection of games focused on the incremental genre with unique mechanics"
            badgeColor="blue"
            gradient="from-blue-300 to-blue-100"
          />
          
          <div className="max-w-3xl mx-auto space-y-8">
            {games.map(game => (
              <div key={game.id} className="transform transition-transform duration-300 hover:-translate-y-2 backdrop-blur-sm">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Updates Section - improved background */}
      <section id="recent-updates" className="py-24 md:py-32 relative">
        {/* Improved background effects for updates section */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20 z-0"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent z-0"></div>
        <div className="absolute inset-0 overflow-hidden z-0">
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader 
            badgeText="WHAT'S NEW" 
            title="Recent Updates"
            description="Stay up to date with the latest developments and blog posts"
            badgeColor="green"
            gradient="from-green-300 to-green-100"
          />
          
          <div className="max-w-2xl mx-auto space-y-6">
            {recentUpdates.map((update, index) => (
              <div key={update.id} className="transform transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm"
                   style={{ transitionDelay: `${index * 100}ms` }}>
                <UpdateCard update={update} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog Articles Section - improved background */}
      <section id="blog" className="py-24 md:py-32 relative">
        {/* Improved background effects for blog section */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20 z-0"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent z-0"></div>
        <div className="absolute inset-0 overflow-hidden z-0">
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader 
            badgeText="INSIGHTS" 
            title="Blog Articles"
            description="Insights, tutorials and thoughts about game development"
            badgeColor="purple"
            gradient="from-purple-300 to-purple-100"
          />
          
          <div className="max-w-3xl mx-auto space-y-8">
            {blogPosts.map(post => (
              <div key={post.id} className="transform transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm">
                <BlogPostCard post={post} />
              </div>
            ))}
            
            <div className="text-center mt-24">
              <Link href="/blog" className="group inline-block px-6 py-3 bg-black border border-purple-600 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] relative overflow-hidden">
                <span className="relative z-10">View All Blog Posts</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action section - Improved gradient background */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-grey-800 via-blue-800 to-blue-800 z-0"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20 z-0"></div>
        <div className="absolute inset-0 overflow-hidden z-0">
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-indigo-900/60 backdrop-blur-md p-10 rounded-xl border border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.3)]">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Want to see more?</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Check out my game guides or read more about the development process on the blog
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides" className="group px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] relative overflow-hidden">
                <span className="relative z-10">Game Guides</span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              <Link href="/blog" className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] relative overflow-hidden">
                <span className="relative z-10">Development Blog</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

