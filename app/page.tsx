

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-[75vh] gap-10 animate-fade-in">
      
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        
        <p className="text-sm text-gray-500">
          George Delp — Builder
        </p>

        <h1 className="text-4xl sm:text-6xl font-semibold leading-tight max-w-2xl animate-slide-up">
          Building systems to track, analyze, and improve performance.
        </h1>

        <p className="text-gray-400 max-w-xl">
          From golf analytics to personal dashboards, I build tools that turn
          data into insight and help me get better over time.
        </p>

        <div className="flex gap-4 mt-2">
          <a
            href="/projects"
            className="px-6 py-3 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-200 transition"
          >
            View Projects
          </a>

          <a
            href="/dashboard"
            className="px-6 py-3 border border-white/20 rounded-md text-sm hover:bg-white/10 transition"
          >
            Open Dashboard
          </a>
        </div>
      </div>

      {/* Bottom subtle section */}
      <div className="text-xs text-gray-500">
        Currently building: Golf Tracker · Personal Dashboard · Stats Systems
      </div>
    </div>
  );
}