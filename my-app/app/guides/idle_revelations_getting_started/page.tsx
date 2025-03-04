import Link from 'next/link'
import Image from 'next/image'

const guide = {
  id: 1,
  title: 'Idle Revelations: Getting Started',
  gameTitle: 'Idle Revelations',
  date: '2024-11-30',
  coverImage: '/flasks.png',
  content: `
    <h2 class="text-2xl font-bold mt-8 mb-4 text-blue-400">Introduction</h2>
    
    <p class="mb-4">Welcome to Idle Revelations! This guide will help you get started with the basics of the game and give you tips for your first few hours of gameplay.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-blue-400">Core Mechanics</h2>
    
    <p class="mb-4">Idle Revelations is centered around generating knowledge and using it to unlock new discoveries. Here are the main resources you'll be working with:</p>
    
    <ul class="list-disc pl-6 mb-6 space-y-2">
      <li><span class="font-bold text-yellow-400">Knowledge Points</span> - The primary currency used for upgrades</li>
      <li><span class="font-bold text-blue-400">Science</span> - Unlocks new technologies in the research tree</li>
      <li><span class="font-bold text-green-400">Wisdom</span> - Used for permanent upgrades that persist through resets</li>
    </ul>
    
    <div class="my-6 bg-gray-800 p-4 rounded-lg">
      <Image src="/tools_30nov.png" alt="Game Interface" width={800} height={400} className="w-full rounded" />
      <p class="text-sm text-gray-400 mt-2 text-center">The main interface showing resource generators</p>
    </div>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-blue-400">First Steps</h2>
    
    <p class="mb-4">When you first start the game, focus on these actions:</p>
    
    <ol class="list-decimal pl-6 mb-6 space-y-2">
      <li>Click on the curiosity button to generate your first knowledge points</li>
      <li>Purchase the "Basic Observation" upgrade as soon as you can</li>
      <li>Save up for "Simple Tools" which will give you your first passive income</li>
      <li>Aim to unlock the "Primitive Science" milestone</li>
    </ol>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-blue-400">The Knowledge Tree</h2>
    
    <p class="mb-4">The knowledge tree is central to your progression. Here's how to approach it:</p>
    
    <div class="my-6 bg-gray-800 p-4 rounded-lg">
      <Image src="/tree_30nov.png" alt="Knowledge Tree" width={800} height={400} className="w-full rounded" />
      <p class="text-sm text-gray-400 mt-2 text-center">The knowledge tree showing available upgrades</p>
    </div>
    
    <p class="mb-4">Start by unlocking the leftmost branches which provide the most immediate benefits. The upper path focuses on resource generation, while the lower path improves your research capabilities.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-blue-400">Tips for Efficient Progress</h2>
    
    <ul class="list-disc pl-6 mb-6 space-y-2">
      <li>Always keep some generators running, even when you're away</li>
      <li>Focus on one branch of the tree at a time</li>
      <li>Save your premium currency (Wisdom) for permanent upgrades</li>
      <li>Your first reset should happen after unlocking "Basic Arithmetic"</li>
    </ul>
    
    <p class="mb-4">Remember that this is an idle game - sometimes the best strategy is to let it run in the background while your resources accumulate!</p>
  `
}

export default function GuidePage() {
  return (
    <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-24 md:py-32 max-w-4xl">
      <article className="bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-lg shadow-xl p-8 md:p-12">
        <header className="mb-8 border-b border-gray-700 pb-6">
          <div className="mb-4">
            <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded text-white">
              {guide.gameTitle}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{guide.title}</h1>
          <p className="text-blue-400 text-sm">{guide.date}</p>
        </header>
        <div className="relative h-60 mb-8 rounded-lg overflow-hidden">
          <Image 
            src={guide.coverImage} 
            alt={guide.title} 
            fill
            className="object-cover"
          />
        </div>
        <div 
          className="prose prose-invert prose-lg max-w-none" 
          dangerouslySetInnerHTML={{ __html: guide.content }} 
        />
      </article>
      <div className="mt-12 text-center">
        <Link href="/guides" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Back to Guides
        </Link>
      </div>
    </div>
  )
} 