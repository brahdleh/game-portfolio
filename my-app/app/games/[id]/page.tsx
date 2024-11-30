import Image from 'next/image'
import Link from 'next/link'

const games = [
  { 
    id: 1, 
    title: 'Idle Revelations', 
    image: '/workspaces/game-portfolio/my-app/app/images/institutions_30nov.svg', 
    description: 'Incremental clicker following our discovery of the universe through the ages. Embark on an epic journey to carry the human race through thousands of years of discovery and knowledge.',
    features: ['Multi-Layer Prestige', 'Engaging Story', 'Novel Mechanics','Clicking (Optional)'],
    longDescription: `
      This is my first game, taking strong inspiration from Idle games I have played in the past, and continue to play now. There are multiple currencies that centre around education and knowledge, these must be accumulated to progress through the tree of understanding. 
      As the game goes on, the player prestiges in multiple tiers of reset, unlocking automation and huge boosts.
      <image src={'/placeholder.svg?height=400&width=600'} alt={game.title} width={500} height={300}/>
    `
  },
]

export default async function GamePage({ params }: { params: { id: string } }) {
  const gameParams = await params;
  const game = games.find(g => g.id === parseInt(gameParams.id))

  if (!game) {
    return <div>Game not found</div>
  }

  return (
    <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-24 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center">{game.title}</h1>
      <p className="text-lg leading-relaxed mb-8">{game.description}</p>
      <div className="gap-12 mb-12">
        <Image src={game.image} alt={game.title} width={500} height={300} className="rounded-lg shadow-lg w-full" />
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Key Features:</h2>
          <ul className="list-disc list-inside space-y-1">
            {game.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: game.longDescription }} />
      <div className="mt-12 text-center">
        <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

