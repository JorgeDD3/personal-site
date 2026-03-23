export default function Projects() {
  return (
    <div className="flex flex-col gap-8">
      
      {/* Page Title */}
      <h1 className="text-3xl font-semibold">Projects</h1>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        
        {/* Golf Tracker */}
<div className="border border-white/10 rounded-xl p-6 hover:border-white/30 hover:bg-white/5 transition flex flex-col justify-between">
  
  <div>
    <h2 className="text-xl font-semibold mb-2">Golf Tracker</h2>

<h2 className="text-xl font-semibold mb-2">Golf Tracker</h2>

<div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-400">
  <span className="border border-white/10 px-2 py-1 rounded">Next.js</span>
  <span className="border border-white/10 px-2 py-1 rounded">TypeScript</span>
  <span className="border border-white/10 px-2 py-1 rounded">Prisma</span>
  <span className="border border-white/10 px-2 py-1 rounded">SQLite</span>
</div>

<p className="text-gray-400 text-sm mb-4">
  A full golf tracking app with course builder, tee sets, yardages,
  and an 18Birdies-style scorecard system. Built to track performance
  over time and analyze trends.
</p>
  </div>

  <div className="flex items-center gap-4 text-sm mt-4">
    <a
      href="http://localhost:3001"
target="_blank"
rel="noopener noreferrer"
      className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition"
    >
      Live App
    </a>

    <a
      href="https://github.com/JorgeDD3/golf-tracker"
target="_blank"
rel="noopener noreferrer"
      className="text-gray-400 hover:text-white underline"
    >
      GitHub
    </a>
  </div>
</div>

{/* Personal Dashboard */}
<div className="border border-white/10 rounded-xl p-6 hover:border-white/30 hover:bg-white/5 transition flex flex-col justify-between">
  
  <div>
    <h2 className="text-xl font-semibold mb-2">Personal Dashboard</h2>

    <p className="text-gray-400 text-sm mb-4">
      A private dashboard for tracking personal data, habits, and analytics.
      This site acts as a hub connecting my projects and tools into one system.
    </p>
  </div>

  <div className="flex items-center gap-4 text-sm mt-4">
    <a
      href="/dashboard"
      className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition"
    >
      Open Dashboard
    </a>

    <a
      href="https://github.com/JorgeDD3/personal-site"
      className="text-gray-400 hover:text-white underline"
    >
      GitHub
    </a>
  </div>
</div>

      </div>
    </div>
  );


}