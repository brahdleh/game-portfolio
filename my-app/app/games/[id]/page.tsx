import Image from 'next/image';
import Link from 'next/link';

const games = [
  { 
    id: 1, 
    title: 'Idle Revelations', 
    images: ['/institutions_30nov.png', '/institutions_30nov.png', '/institutions_30nov.png', '/institutions_30nov.png'],
    description: 'Incremental clicker following our discovery of the universe through the ages. Embark on an epic journey to carry the human race through thousands of years of discovery and advancement.',
    features: ['Multi-Layer Prestige', 'Engaging Story', 'Novel Mechanics', 'Clicking (Optional)'],
    longDescription: `
      This is my first game, taking strong inspiration from Idle games I have played in the past, and continue to play now. There are multiple currencies that centre around education and knowledge, these must be accumulated to progress through the tree of understanding. 
      As the game goes on, the player prestiges in multiple tiers of reset, unlocking automation and huge boosts.
    `,
    updates: [
      {
        title: "Core Functionality Finished",
        date: "2024-11-30",
        description: "The ugly skeleton of Idle Revelations is complete.",
        images: ['/institutions_30nov.png'],
      },
      {
        title: "Development Begins",
        date: "2024-04-01",
        description: `Unity has been installed, youtube tutorials have been watched, and ideas have started to be materialised.
        There is a bit of a learning curve to C#, and managing the script architecture is challenging, but progress is now underway!
        `,
        images: [],
      },
    ],
  },
];

export default async function GamePage({ params }: { params: { id: string } }) {
  const gameParams = await params;
  const game = games.find(g => g.id === parseInt(gameParams.id));

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-24 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center">{game.title}</h1>
      <p className="text-lg leading-relaxed mb-8">{game.description}</p>
      <div className="gap-12 mb-12">
        <div className='grid grid-cols-4 gap-x-3'>
          {game.images.map((image, index) => (
            <Image key={index} src={image} alt={game.title} width={500} height={500} className="span-cols-1 rounded-lg shadow-lg mb-10" />
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Key Features:</h2>
          <ul className="list-disc list-inside space-y-1">
            {game.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="prose prose-invert max-w-none mb-12" dangerouslySetInnerHTML={{ __html: game.longDescription }} />
      
      <h2 className="text-3xl font-bold mb-8">Updates & Progress</h2>
      <div className="space-y-10">
        {game.updates.map((update, index) => (
          <div key={index} className="border rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold">{update.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{update.date}</p>
            <p className="text-base leading-relaxed mb-4">{update.description}</p>
            <div className="flex flex-wrap gap-4">
              {update.images.map((image, imgIndex) => (
                <Image key={imgIndex} src={image} alt={update.title} width={200} height={120} className="rounded-lg shadow-md" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}