export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm text-gray-500">Private Dashboard</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-4 max-w-2xl text-base text-gray-400">
            This is the foundation for my personal system. It will hold my books
            tracker, finance tracker, portfolio/resume tools, and eventually
            analytics from the apps I build.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-gray-500">01</p>
            <a
  href="/dashboard/books"
  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10 block"
>
  <p className="text-sm text-gray-500">01</p>
  <h2 className="mt-3 text-xl font-semibold">Books Tracker</h2>
  <p className="mt-3 text-sm text-gray-400">
    Track books, reading progress, ratings, notes, and yearly goals.
  </p>
  <p className="mt-6 text-xs text-gray-500">Build next</p>
</a>
            <p className="mt-3 text-sm text-gray-400">
              Track books, reading progress, ratings, notes, and yearly goals.
            </p>
            <p className="mt-6 text-xs text-gray-500">Build next</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-gray-500">02</p>
            <h2 className="mt-3 text-xl font-semibold">Finance Tracker</h2>
            <p className="mt-3 text-sm text-gray-400">
              Track income, expenses, categories, and monthly trends in one place.
            </p>
            <p className="mt-6 text-xs text-gray-500">Coming after books</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-gray-500">03</p>
            <h2 className="mt-3 text-xl font-semibold">Portfolio / Resume</h2>
            <p className="mt-3 text-sm text-gray-400">
              Organize projects, experience, skills, and a cleaner public story.
            </p>
            <p className="mt-6 text-xs text-gray-500">Public + private tools</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Roadmap</h2>
          <p className="mt-3 text-sm text-gray-400">
            First, build the books tracker. Then add the finance tracker. After
            that, expand the portfolio/resume section and lock the dashboard with auth.
          </p>
        </div>
      </section>
    </main>
  );
}