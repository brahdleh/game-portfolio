import GuideCard from '@/app/components/GuideCard'

// Sample guides data
const guides = [
  { 
    id: 1, 
    title: 'Idle Revelations: Getting Started', 
    gameTitle: 'Idle Revelations',
    date: '2024-11-30', 
    image: '/flasks.png', 
    excerpt: 'A beginner\'s guide to your first hours in Idle Revelations.',
    url: 'idle_revelations_getting_started'
  },
  { 
    id: 2, 
    title: 'Advanced Knowledge Mechanics', 
    gameTitle: 'Idle Revelations',
    date: '2024-11-25', 
    image: '/tree_30nov.png', 
    excerpt: 'Master the knowledge tree to accelerate your progress.',
    url: 'idle_revelations_knowledge_tree'
  },
]

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-6xl">
      <section className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-6 text-white">Game Guides</h1>
        <p className="text-xl mb-8 text-blue-400">Detailed walkthroughs and strategies for my games</p>
      </section>

      <section id="guides-list" className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map(guide => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>
    </div>
  )
} 