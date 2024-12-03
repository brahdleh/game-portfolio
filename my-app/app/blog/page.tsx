import BlogPostCard from '@/app/components/BlogPostCard'

// Assuming you'll fetch this data from an API or CMS in the future
const blogPosts = [
  { 
    id: 1, 
    title: 'Cursor + Unity: my experience so far...', 
    date: '2024-11-15', 
    image: '/placeholder.svg?height=200&width=300', 
    excerpt: 'AI is now part and parcel of web development, but how well does it work in mobile game development?',
    url: '/cursor_plus_unity_dec_24'
  },
  { 
    id: 2, 
    title: 'Coming Soon...', 
    date: '2024-10-20', 
    image: '/placeholder.svg?height=200&width=300', 
    excerpt: 'Watch this space.',
    url: '/cursor_plus_unity_dec_24'
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-24 space-y-32 max-w-5xl">
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Blog Articles</h1>
        <p className="text-xl mb-8 text-blue-400">Insights from Game Development</p>
      </section>

      <section id="blog-posts" className="max-w-3xl mx-auto">
        <div className="space-y-16">
          {blogPosts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

