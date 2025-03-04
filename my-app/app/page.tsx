import GameCard from './components/GameCard'
import BlogPostCard from './components/BlogPostCard'
import UpdateCard from './components/UpdateCard'
import InteractiveBackground from './components/game/InteractiveBackground'
import Link from 'next/link'
import Image from 'next/image'

const games = [
  { id: 1, title: 'Idle Revelations', image: '/flasks.png', description: 'Incremental clicker following our discovery of the universe through the ages.', url:'idle_revelations' },
  { id: 2, title: 'Coming Soon', image: '/question.png', description: 'Something new will arrive eventually- have a little patience!', url:'idle_revelations' },
]

const blogPosts = [
  { id: 1, title: 'Cursor + Unity: my experience so far...', date: '2024-11-15', 'image': '/cursor.png', excerpt: 'AI is now part and parcel of web development, but how well does it work in mobile game development?', url:'cursor_plus_unity_dec_24' },
]

const recentUpdates = [
  { id: 1, title: 'Idle Revelations: Core Functionality Complete', date: '2024-11-25', type: 'game', url:'idle_revelations' },
  { id: 2, title: 'Blog Post: Cursor + Unity: my experience so far...', date: '2024-11-15', type: 'blog', url:'cursor_plus_unity_dec_24' },
  { id: 3, title: 'IDLE Revelations Begins', date: '2024-6-05', type: 'game', url:'idle_revelations' },
]

export default function Home() {
  return (
    <div className="relative">
      <InteractiveBackground />
      
      {/* Hero Section with improved visual impact */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center z-10">
          <div className="max-w-2xl mx-auto bg-gray-900 bg-opacity-60 backdrop-blur-md p-8 rounded-xl shadow-2xl">
            <div className="w-24 h-24 rounded-full bg-blue-600 mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl font-bold">BW</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Bradley Westwood</h1>
            <p className="text-xl mb-8 text-blue-400 font-semibold">Game Developer</p>
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              Come along with me on this journey to deliver fun and novel additions to the incremental genre.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#games" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-lg">
                View My Games
              </Link>
              <Link href="#recent-updates" className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all transform hover:-translate-y-1 shadow-lg">
                Recent Updates
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Games Section with better spacing and design */}
      <section id="games" className="py-24 md:py-32 bg-gray-900 bg-opacity-80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My Games</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Explore my collection of games focused on the incremental genre with unique mechanics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Updates Section with card design */}
      <section id="recent-updates" className="py-24 md:py-32 bg-gray-800 bg-opacity-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Recent Updates</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Stay up to date with the latest developments and blog posts
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentUpdates.map(update => (
              <UpdateCard key={update.id} update={update} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog Articles Section */}
      <section id="blog" className="py-24 md:py-32 bg-gray-900 bg-opacity-80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Blog Articles</h2>
            <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Insights, tutorials and thoughts about game development
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {blogPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
            
            <div className="text-center mt-12">
              <Link href="/blog" className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all transform hover:-translate-y-1 shadow-lg">
                View All Blog Posts
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action section */}
      <section className="py-16 md:py-24 bg-blue-900 bg-opacity-30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Want to see more?</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Check out my game guides or read more about the development process on the blog
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:-translate-y-1 shadow-lg">
              Game Guides
            </Link>
            <Link href="/blog" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all transform hover:-translate-y-1 shadow-lg">
              Development Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

