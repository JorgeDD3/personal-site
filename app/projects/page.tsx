import Link from "next/link";

const projects = [
  {
    name: "Golf Tracker",
    status: "In Progress",
    description:
      "A golf stats tracking app with scorecards, round history, and user-based views.",
    href: "#",
  },
  {
    name: "Personal Dashboard",
    status: "Planned",
    description:
      "A private dashboard for books, finances, personal analytics, and more.",
    href: "/dashboard",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          A growing collection of projects I’m building and iterating on.
        </p>

        <div className="mt-10 grid gap-5">
          {projects.map((project) => (
            <div
              key={project.name}
              className="rounded-2xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">{project.name}</h2>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                  {project.status}
                </span>
              </div>

              <p className="mt-4 text-gray-600">{project.description}</p>

              <div className="mt-5">
                <Link
                  href={project.href}
                  className="text-sm font-medium underline underline-offset-4"
                >
                  Open
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}