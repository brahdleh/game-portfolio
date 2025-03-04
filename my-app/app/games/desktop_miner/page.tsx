import Image from 'next/image';
import Link from 'next/link';

const game = { 
  id: 1, 
  title: 'Desktop Miner', 
  images: ['/desktop_miner.png'],
  description: 'Browser based mining game to kill the time. Play it here: https://desktop-miner.vercel.app/',
  features: ['Mining', 'Crafting', 'Automating'],
  longDescription: `
    Browser game built entirely in React.
  `,
  updates: [
    {
      title: "Development Begins",
      date: "2025-02-14",
      description: `With advances in AI, I thought it would be good to try and build a browser game using it.
      `,
      images: [],
    },
  ],
}


export default async function GamePage() {
  return (
    <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-48 max-w-5xl">
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
        <Link href="/#games" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Back to Games
        </Link>
      </div>
    </div>
  );
}
