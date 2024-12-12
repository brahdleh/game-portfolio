import GameCard from '@/app/components/GameCard'

// Assuming you'll fetch this data from an API or CMS in the future
const games = [
    {
         id: 1, 
         title: 'Idle Revelations', 
         image: '/flasks.png', 
         description: 'Incremental clicker following our discovery of the universe through the ages.',
         url:'idle_revelations' },
    { 
        id: 2, 
        title: 'Coming Soon', 
        image: '/question.png', 
        description: 'Something new will arrive eventually- have a little patience!',
        url:'idle_revelations' },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-48 space-y-32 w-2/3">
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Games</h1>
        <p className="text-1xl mb-8 text-blue-400">Made for Mobile, Live and in Development</p>
      </section>

      <section id="blog-posts" className="max-w-3xl mx-auto">
        <div className="space-y-16">
          {games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  )
}

