import GameCard from './components/GameCard'
import BlogPostCard from './components/BlogPostCard'
import UpdateCard from './components/UpdateCard'

const games = [
  { id: 1, title: 'Idle Revelations', image: '/placeholder.svg?height=200&width=300', description: 'Incremental clicker following our discovery of the universe through the ages.', url:'idle_revelations' },
  { id: 2, title: 'Coming Soon', image: '/placeholder.svg?height=200&width=300', description: 'Something new will arrive eventually- have a little patience!', url:'idle_revelations' },
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
    <div className="container mx-auto px-4 py-24 space-y-32 max-w-5xl">
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Bradley Westwood</h1>
        <p className="text-xl mb-8 text-blue-400">Game Developer & Co-Founder</p>
        <p className="text-base leading-relaxed mb-4">
          After dedicating a large part of my childhood to clicking, and waiting, and clicking some more... 
          Soaking up everything the idle incremental space had to offer, I feel more than ready to throw my hat into the ring as a developer.
        </p>
        <p className="text-base leading-relaxed">
          No longer shall the community be served tedious, derivative, money hungry games!
          Come along with me on this journey to deliver novel additions to a genre that has kept us entertained for years.
        </p>
      </section>

      <section id="games" className="max-w-3xl mx-auto space-y-16">
        <h2 className="text-3xl font-bold mb-8 text-center">My Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
    </div>
  )
}

