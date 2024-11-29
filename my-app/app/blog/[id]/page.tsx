import Link from 'next/link'
import Image from 'next/image'


const blogPosts = [
  { 
    id: 1, 
    title: 'Cursor + Unity: my experience so far...', 
    image: '/placeholder.svg?height=200&width=300',
    date: '2023-05-15', 
    content: `
        <p>AI is part and parcel of web development, but how well does it work in mobile game development?</p>
        </br>
        <h1>Cursor</h1>
        </br>
        <p>If you're interested in building anything, then AI development tools will been hot on your radar. 
        Essentially, Cursor and similar tools like Windsurf massively streamline the process of going back and forth with ChatGPT, 
        slowly refining code piece by piece</p>
        </br?
        <p>You quickly find it is much more efficient to work with AI when it is able to see your entire repository at once,
        and when it is able to make changes itself.
        </p>
    `
  },
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(p => p.id === parseInt(params.id))

  if (!post) {
    return <div>Blog post not found</div>
  }

  return (
    <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-24 max-w-5xl">
      <article className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-blue-400 text-sm">{post.date}</p>
          <Image src={post.image} alt={post.title} width={400} height={200} className="w-full" />
        </header>
        <div className="prose prose-invert prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      <div className="mt-12 text-center">
        <Link href="/" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

