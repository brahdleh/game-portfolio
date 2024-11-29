import Link from 'next/link'

interface UpdateCardProps {
  update: {
    id: number
    title: string
    date: string
    type: string
  }
}

export default function UpdateCard({ update }: UpdateCardProps) {
  const href = update.type === 'game' ? `/games/${update.id}` : `/blog/${update.id}`

  return (
    <div className="bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 hover:bg-opacity-50">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm px-2 py-1 rounded ${update.type === 'game' ? 'bg-blue-600' : 'bg-green-600'}`}>
          {update.type === 'game' ? 'Game Update' : 'New Blog Post'}
        </span>
        <span className="text-sm text-gray-400">{update.date}</span>
      </div>
      <h3 className="text-lg font-semibold">{update.title}</h3>
      <Link
        href={href}
        className="text-sm text-blue-400 hover:underline mt-2 inline-block"
      >
        Read more
      </Link>
    </div>
  )
}

