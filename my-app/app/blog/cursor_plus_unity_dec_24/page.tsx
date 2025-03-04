import Link from 'next/link'
import Image from 'next/image'

// This type is used to define the shape of our data.
type BlogPost = {
  id: number
  title: string
  image: string
  date: string
  content: string
}

const post: BlogPost = { 
    id: 1, 
    title: 'Cursor + Unity: my experience so far...', 
    image: '/cursor.png',
    date: '2023-05-15', 
    content: `
        <p class="text-lg mb-6">AI is part and parcel of web development, but how well does it work in mobile game development?</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-blue-400">What is Cursor?</h2>
        
        <p class="mb-4">If you're interested in building anything, then AI development tools will been hot on your radar.</p>
        
        <p class="mb-4">Essentially, AI dev tools like Cursor and Windsurf massively streamline the process of going back and forth with ChatGPT, 
        slowly refining code piece by piece. Equally, if you are the beginning of your project they can lay a solid foundation
        for you to build on.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-blue-400">Auto-Complete</h2>
        
        <p class="mb-4">One of Cursor's offerings is an autofill functionality for code, this attempts to autopredict code to save you time. 
        This goes beyond finishing your current line, Cursor can suggest and write entire functions given enough context.</p>
        
        <p class="mb-4">For example, if I have a function called 'InstitutionClick' that is called when an institution upgrade is clicked. 
        This involves several variables of different types in different classes.</p> 
        
        <p class="mb-4">If I then decided to start typing 'MasteryUpgr..." Cursor is able to create an entire function, 
        substituting out each institution variable and class for their analagous mastery counterpart.</p>
        
        <p class="mb-4">It is worth mentioning that the auto-complete can be completely wrong, and when it is, it gets in the way of clicking tab 
        to autofill a variable name, which is very counter-productive.</p>
        
        <p class="mb-4 font-italic text-gray-400">PS: if auto-complete is saving you a lot of time, it may mean you have a code duplication problem!</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-blue-400">Composer</h2>
        
        <p class="mb-4">The prized feature of cursor is the AI chat interface, able to answer your questions and make direct changes to your code.</p>
        
        <p class="mb-4">Using Cursor removes the struggle of going back and forth with ChatGPT or Claude, and allows you to agree to code changes line by line.
        This means you catch moments where the AI has misunderstood, or make improvements to their implementation.</p>
        
        <p class="mb-4">Unity gives you no choice but to learn C#, as a beginner it can be easy to miss key functionality that can make your game more robust, 
        and your code more organised. Cursor can tell you when a new class should be defined, and write the entire script defining it.</p>
        
        <p class="mb-4">You quickly find it is much more efficient to work with AI when it is able to see your entire repository,
        and when it is able to make changes itself. As there are so many interconnected scripts and classes in a unity
        project, this feature lends itself very nicely.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4 text-blue-400">Conclusion</h2>
        
        <p class="mb-4">Cursor is already great, and with the rate of improvement to LLMs these days, it will only get better.</p>
        
        <p class="mb-4">The implementation and UI is smooth, and LLMs already have a solid grasp on C# and game architecture - just don't expect to get too much out of it before the $20 paywall!</p>
    `
}

export default async function BlogPostPage() {
  return (
    <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-24 md:py-32 max-w-4xl">
      <article className="bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-lg shadow-xl p-8 md:p-12">
        <header className="mb-8 border-b border-gray-700 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{post.title}</h1>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
              <span className="font-bold">BW</span>
            </div>
            <p className="text-blue-400 text-sm">{post.date}</p>
          </div>
          <div className="mt-6">
            <Image 
              src={post.image} 
              alt={post.title} 
              width={400} 
              height={200}  
              className="max-w-[120px]"
            />
          </div>
        </header>
        <div 
          className="prose prose-invert prose-lg max-w-none" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
      <div className="mt-12 text-center">
        <Link href="/blog" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Back to Blog
        </Link>
      </div>
    </div>
  )
}

