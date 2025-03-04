import Link from 'next/link'

interface UpdateCardProps {
  update: {
    id: number
    title: string
    date: string
    type: string
    url: string
  }
}

export default function UpdateCard({ update }: UpdateCardProps) {
  const href = update.type === 'game' ? `/games/${update.url}` : `/blog/${update.url}`

  return (
    <div className="bg-gray-900/80 rounded-lg border border-gray-700 shadow-lg overflow-hidden hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(74,222,128,0.2)] transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-2 ${
              update.type === 'game' ? 'bg-blue-900/50 text-blue-300 border border-blue-800' : 'bg-purple-900/50 text-purple-300 border border-purple-800'
            }`}>
              {update.type === 'game' ? 'GAME UPDATE' : 'BLOG POST'}
            </span>
            <h3 className="text-xl font-semibold mb-2 text-white">{update.title}</h3>
            <p className="text-gray-400 text-sm">{update.date}</p>
          </div>
          <div className="ml-4">
            <Link href={href}>
              <span className="inline-flex rounded-full bg-gray-800 p-2 hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

