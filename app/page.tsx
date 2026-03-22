import Link from "next/link";

const cards = [
  {
    title: "Projects",
    description: "See the apps, tools, and systems I’m building.",
    href: "/projects",
  },
  {
    title: "About",
    description: "Learn more about me, my background, and what I’m focused on.",
    href: "/about",
  },
  {
    title: "Dashboard",
    description: "Private personal dashboard for my own tools and tracking.",
    href: "/dashboard",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
          George Delp
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          Personal site, project hub, and dashboard.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          I’m building software projects around golf, personal analytics, and
          tools I actually want to use. This site is my public portfolio and
          long-term home base.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            View Projects
          </Link>
          <Link
            href="/about"
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
          >
            About Me
          </Link>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-2xl border border-gray-200 p-6 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}