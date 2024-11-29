import Image from 'next/image'
import Link from 'next/link'

const games = [
  { 
    id: 1, 
    title: 'Space Explorer', 
    image: '/placeholder.svg?height=400&width=600', 
    description: 'A 2D space exploration game where players navigate through a vast universe, discovering new planets and facing cosmic challenges.',
    features: ['Procedurally generated galaxies', 'Resource management', 'Ship customization'],
    longDescription: `
      <p>Embark on an epic journey through the cosmos in Space Explorer, a captivating 2D space exploration game that pushes the boundaries of discovery and adventure. As a lone astronaut, you'll pilot your customizable spacecraft through an expansive, procedurally generated universe teeming with wonders and perils.</p>
      
      <p>Key Features:</p>
      <ul>
        <li><strong>Vast, Procedural Universe:</strong> Every playthrough offers a unique experience with countless star systems, planets, and anomalies to discover.</li>
        <li><strong>Deep Resource Management:</strong> Carefully manage your ship's fuel, oxygen, and other vital resources as you venture deeper into space.</li>
        <li><strong>Ship Customization:</strong> Upgrade and modify your ship with advanced technologies to survive increasingly challenging environments.</li>
        <li><strong>Alien Encounters:</strong> Interact with diverse alien species, each with their own cultures, technologies, and quests.</li>
        <li><strong>Scientific Discovery:</strong> Conduct research on exotic phenomena and contribute to the galaxy's scientific knowledge.</li>
      </ul>

      <p>Whether you're charting new star systems, trading with alien civilizations, or unraveling the mysteries of ancient space artifacts, Space Explorer offers an immersive experience that will keep you coming back for more. Are you ready to leave your mark on the galaxy?</p>
    `
  },
  { 
    id: 2, 
    title: 'Dungeon Crawler', 
    image: '/placeholder.svg?height=400&width=600', 
    description: 'A roguelike dungeon crawler with permadeath and randomly generated levels. Players must navigate treacherous dungeons, defeat monsters, and collect loot.',
    features: ['Randomly generated dungeons', 'Permadeath mechanics', 'Diverse character classes'],
    longDescription: `
      <p>Descend into the depths of danger and mystery with Dungeon Crawler, a challenging roguelike that tests your wits, reflexes, and strategy. Every run is a unique adventure through procedurally generated dungeons filled with fearsome monsters, valuable treasures, and game-changing decisions.</p>
      
      <p>Key Features:</p>
      <ul>
        <li><strong>Endless Variety:</strong> Experience a new dungeon layout, enemy placement, and loot distribution with every playthrough.</li>
        <li><strong>Permadeath Intensity:</strong> Every decision matters. One wrong move could end your run, but the lessons learned will make you stronger for the next attempt.</li>
        <li><strong>Class Diversity:</strong> Choose from a wide array of character classes, each with unique abilities and playstyles. Will you be a sturdy knight, a cunning rogue, or a powerful mage?</li>
        <li><strong>Deep Item System:</strong> Discover hundreds of items, from common healing potions to legendary artifacts, each capable of turning the tide of battle.</li>
        <li><strong>Evolving Challenges:</strong> Face increasingly difficult monsters and traps as you delve deeper, with epic boss battles that will push your skills to the limit.</li>
      </ul>

      <p>Dungeon Crawler offers a perfect blend of accessibility and depth. Easy to pick up for a quick run, yet filled with enough complexity and secrets to keep you engaged for hundreds of hours. Do you have what it takes to conquer the dungeon and uncover its ultimate treasures?</p>
    `
  },
]

export default function GamePage({ params }: { params: { id: string } }) {
  const game = games.find(g => g.id === parseInt(params.id))

  if (!game) {
    return <div>Game not found</div>
  }

  return (
    <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-24 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center">{game.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
        <div className="lg:col-span-2">
          <Image src={game.image} alt={game.title} width={600} height={400} className="rounded-lg shadow-lg w-full" />
        </div>
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">{game.description}</p>
          <h2 className="text-2xl font-bold">Features:</h2>
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

