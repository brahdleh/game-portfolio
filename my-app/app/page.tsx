import Image from 'next/image'
import Link from 'next/link'
import GameCard from './components/GameCard'
import BlogPostCard from './components/BlogPostCard'
import UpdateCard from './components/UpdateCard'

const games = [
  { id: 1, title: 'Space Explorer', image: '/placeholder.svg?height=200&width=300', description: 'A 2D space exploration game' },
  { id: 2, title: 'Dungeon Crawler', image: '/placeholder.svg?height=200&width=300', description: 'A roguelike dungeon crawler' },
]

const blogPosts = [
  { id: 1, title: 'The Art of Game Design', date: '2023-05-15', excerpt: 'Exploring the principles of effective game design...' },
  { id: 2, title: 'Optimizing Game Performance', date: '2023-06-01', excerpt: 'Tips and tricks for improving your game\'s performance...' },
]

const recentUpdates = [
  { id: 1, title: 'New Level Added to Space Explorer', date: '2023-06-15', type: 'game' },
  { id: 1, title: 'Blog: The Importance of Sound Design', date: '2023-06-10', type: 'blog' },
  { id: 2, title: 'Dungeon Crawler: Major Performance Update', date: '2023-06-05', type: 'game' },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-24 space-y-32 max-w-5xl">
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">John Doe</h1>
        <p className="text-xl mb-8 text-blue-400">Game Developer & Designer</p>
        <p className="text-base leading-relaxed">
          I'm a passionate game developer with 5 years of experience creating engaging and innovative games.
          My focus is on crafting immersive experiences that challenge and delight players.
        </p>
      </section>

      <section id="recent-updates" className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Recent Updates</h2>
        <div className="space-y-4">
          {recentUpdates.map(update => (
            <UpdateCard key={update.id} update={update} />
          ))}
        </div>
      </section>

      <section id="games" className="max-w-3xl mx-auto space-y-16">
        <h2 className="text-3xl font-bold mb-8 text-center">My Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section id="blog" className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h2>
        <div className="space-y-8">
          {blogPosts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

