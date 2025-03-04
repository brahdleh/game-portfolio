import Link from 'next/link'
import Image from 'next/image'

interface GuideCardProps {
  guide: {
    id: number
    title: string
    gameTitle: string
    image: string
    date: string
    excerpt: string
    url: string
  }
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-2xl hover:-translate-y-1 group">
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={guide.image} 
          alt={guide.title} 
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded text-white">
            {guide.gameTitle}
          </span>
          <p className="text-white text-sm mt-2">{guide.date}</p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-white">{guide.title}</h3>
        <p className="text-gray-300 mb-4">{guide.excerpt}</p>
        {/*<Link href={`/guides/${guide.url}`} className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
          Read Guide
        </Link>*/}
      </div>
    </div>
  )
} 