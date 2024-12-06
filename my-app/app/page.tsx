import GameCard from './components/GameCard'
import BlogPostCard from './components/BlogPostCard'
import UpdateCard from './components/UpdateCard'
import InteractiveBackground from './components/InteractiveBackground'

const games = [
  { id: 1, title: 'Idle Revelations', image: '/placeholder.svg?height=300&width=200', description: 'Incremental clicker following our discovery of the universe through the ages.', url:'idle_revelations' },
  { id: 2, title: 'Coming Soon', image: '/placeholder.svg?height=300&width=200', description: 'Something new will arrive eventually- have a little patience!', url:'idle_revelations' },
]

const blogPosts = [
  { id: 1, title: 'Cursor + Unity: my experience so far...', date: '2024-11-15', 'image': '/placeholder.svg?height=200&width=300', excerpt: 'AI is now part and parcel of web development, but how well does it work in mobile game development?', url:'cursor_plus_unity_dec_24' },
]

const recentUpdates = [
  { id: 1, title: 'Idle Revelations: Core Functionality Complete', date: '2024-11-25', type: 'game', url:'idle_revelations' },
  { id: 2, title: 'Blog Post: Cursor + Unity: my experience so far...', date: '2024-11-15', type: 'blog', url:'cursor_plus_unity_dec_24' },
  { id: 3, title: 'IDLE Revelations Begins', date: '2024-6-05', type: 'game', url:'idle_revelations' },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-24 space-y-32 w-1/2">
      <InteractiveBackground />
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Bradley Westwood</h1>
        <p className="text-1xl mb-8 text-blue-400">Game Developer & Co-Founder</p>
        <p className="text-1xl leading-relaxed">
          Come along with me on this journey to deliver fun and novel additions to the incremental genre.
        </p>
      </section>

      <section id="games" className="max-w-2xl mx-auto space-y-16">
        <h2 className="text-xl font-bold mb-8 text-center">My Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
          {games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section id="recent-updates" className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Recent Updates</h2>
        <div className="space-y-4">
          {recentUpdates.map(update => (
            <UpdateCard key={update.id} update={update} />
          ))}
        </div>
      </section>

      <section id="blog" className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Blog Articles</h2>
        <div className="space-y-8">
          {blogPosts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section id="Empty Space" className="max-w-3xl mx-auto space-y-40">
        <h2 className="text-3xl opacity-0 font-bold mb-50 text-center">.</h2>
        <h2 className="text-3xl opacity-0 font-bold mb-50 text-center">.</h2>
        <h2 className="text-3xl opacity-0 font-bold mb-50 text-center">.</h2>
        <h2 className="text-3xl opacity-0 font-bold mb-50 text-center">.</h2>
        <h2 className="text-3xl opacity-0 font-bold mb-50 text-center">.</h2>
        <h2 className="text-3xl opacity-0 font-bold mb-50 text-center">.</h2>
      </section>
    </div>
  )
}

