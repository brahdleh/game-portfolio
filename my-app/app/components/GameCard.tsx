'use client'

import Image from 'next/image'
import Link from 'next/link'

interface GameCardProps {
  game: {
    id: number
    title: string
    image: string
    description: string
    url: string
  }
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:bg-opacity-50 max-w-md mx-auto">
      <Image 
        src={game.image} 
        alt={game.title} 
        width={400} 
        height={400} 
        className="w-full h-90 object-cover px-24 py-5"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{game.title}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{game.description}</p>
        <Link href={`/games/${game.url}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
          Learn More
        </Link>
      </div>
    </div>
  )
}

