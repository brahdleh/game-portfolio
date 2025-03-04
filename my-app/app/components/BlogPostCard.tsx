import Link from 'next/link'
import Image from 'next/image'


interface BlogPostCardProps {
  post: {
    id: number
    title: string
    image: string
    date: string
    excerpt: string
    url: string
  }
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <div className="bg-gray-900/80 rounded-lg border border-gray-700 shadow-lg overflow-hidden hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-6 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <Image 
            src={post.image} 
            alt={post.title} 
            height={150} 
            width={150}
            className="w-32 h-32 object-contain rounded-lg"
          />
        </div>
        <div className="md:w-3/4 p-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-2 bg-purple-900/50 text-purple-300 border border-purple-800">
                BLOG
              </span>
              <h3 className="text-xl font-semibold mb-3 text-white">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{post.date}</p>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>
              <Link 
                href={`/blog/${post.url}`} 
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(139,92,246,0.4)] group"
              >
                <span>Read More</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

