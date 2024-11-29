import Link from 'next/link'

interface BlogPostCardProps {
  post: {
    id: number
    title: string
    date: string
    excerpt: string
  }
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <div className="bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg p-4 transition-all duration-300 hover:bg-opacity-50">
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="text-sm text-blue-400 mb-2">{post.date}</p>
      <p className="text-sm text-gray-300 mb-4">{post.excerpt}</p>
      <Link href={`/blog/${post.id}`} className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
        Read More
      </Link>
    </div>
  )
}

