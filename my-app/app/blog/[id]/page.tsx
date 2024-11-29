import Link from 'next/link'

const blogPosts = [
  { 
    id: 1, 
    title: 'The Art of Game Design', 
    date: '2023-05-15', 
    content: `
      <p>Game design is a multifaceted discipline that combines creativity, psychology, and technology to create engaging interactive experiences. In this post, we'll explore some key principles that can elevate your game design from good to great.</p>

      <h2>1. Clear Core Mechanics</h2>
      <p>Every great game has a set of core mechanics that are easy to understand but difficult to master. These mechanics should be introduced early and then expanded upon throughout the game. For example, in Super Mario Bros., the core mechanics of running and jumping are introduced immediately, but the game continually finds new ways to challenge players with these simple actions.</p>

      <h2>2. Balanced Difficulty Curve</h2>
      <p>A well-designed game gradually increases in difficulty, challenging players to improve their skills without becoming frustrating. This often involves:</p>

      <ul>
        <li>Introducing new concepts or challenges one at a time</li>
        <li>Providing a safe space for players to practice new skills</li>
        <li>Offering optional challenges for more advanced players</li>
        <li>Implementing dynamic difficulty adjustment to cater to different skill levels</li>
      </ul>

      <h2>3. Meaningful Choices</h2>
      <p>Great games offer players meaningful choices that have a real impact on their experience. This could be through dialogue options, character customization, or different approaches to solving puzzles or defeating enemies. The key is to ensure that these choices have visible consequences, encouraging players to think critically about their decisions.</p>

      <h2>4. Compelling Narrative</h2>
      <p>Even in games where story isn't the main focus, a compelling narrative can greatly enhance the player's engagement. This doesn't necessarily mean complex plots or lengthy cutscenes. Sometimes, environmental storytelling or minimal text can be just as effective in creating a rich, immersive world.</p>

      <h2>5. Satisfying Feedback Loops</h2>
      <p>Feedback loops are crucial in game design. They provide players with immediate responses to their actions, reinforcing behaviors and making the game feel more responsive. This can include visual effects, sound cues, or haptic feedback. The more satisfying these feedback loops are, the more engaging the game becomes.</p>

      <h2>Conclusion</h2>
      <p>Game design is an art form that requires a deep understanding of human psychology, technology, and creativity. By focusing on clear mechanics, balanced difficulty, meaningful choices, compelling narratives, and satisfying feedback, you can create games that not only entertain but also provide rich, memorable experiences for your players.</p>
    `
  },
  { 
    id: 2, 
    title: 'Optimizing Game Performance', 
    date: '2023-06-01', 
    content: `
      <p>In the world of game development, performance optimization is crucial for delivering a smooth and enjoyable player experience. This post will explore some key strategies for improving your game's performance across various platforms.</p>

      <h2>1. Efficient Asset Management</h2>
      <p>One of the most impactful ways to optimize your game's performance is through efficient asset management. This involves:</p>
      <ul>
        <li>Using appropriate texture sizes and compression</li>
        <li>Implementing level of detail (LOD) systems for 3D models</li>
        <li>Employing texture atlasing to reduce draw calls</li>
        <li>Utilizing asset streaming to manage memory usage</li>
      </ul>

      <h2>2. Optimized Rendering</h2>
      <p>Rendering is often one of the most performance-intensive aspects of a game. Here are some techniques to optimize your rendering pipeline:</p>
      <ul>
        <li>Use occlusion culling to avoid rendering unseen objects</li>
        <li>Implement efficient lighting techniques like lightmapping for static objects</li>
        <li>Utilize instancing for rendering multiple similar objects</li>
        <li>Optimize shaders for performance on target hardware</li>
      </ul>

      <h2>3. Efficient Physics Calculations</h2>
      <p>Physics simulations can be computationally expensive. To optimize physics in your game:</p>
      <ul>
        <li>Use simplified collision shapes for complex objects</li>
        <li>Implement spatial partitioning to reduce the number of collision checks</li>
        <li>Consider using fixed timestep for physics calculations</li>
        <li>Optimize ragdoll physics by using a lower detail skeleton</li>
      </ul>

      <h2>4. Code Optimization</h2>
      <p>Efficient code can significantly improve your game's performance. Some best practices include:</p>
      <ul>
        <li>Using appropriate data structures for your use case</li>
        <li>Implementing object pooling for frequently created and destroyed objects</li>
        <li>Optimizing loops and avoiding unnecessary calculations</li>
        <li>Utilizing multithreading for CPU-intensive tasks</li>
      </ul>

      <h2>5. Platform-Specific Optimizations</h2>
      <p>Different platforms have different strengths and limitations. It's important to:</p>
      <ul>
        <li>Understand the hardware capabilities of your target platforms</li>
        <li>Utilize platform-specific APIs and features when available</li>
        <li>Optimize UI for different screen sizes and input methods</li>
        <li>Consider using platform-specific asset compression and loading techniques</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Performance optimization is an ongoing process that requires constant attention throughout the development cycle. By focusing on efficient asset management, optimized rendering, efficient physics calculations, code optimization, and platform-specific optimizations, you can ensure that your game runs smoothly across a wide range of devices, providing the best possible experience for your players.</p>
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

