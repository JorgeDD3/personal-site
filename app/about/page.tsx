export default function About() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      
      <h1 className="text-3xl font-semibold">About</h1>

      <p className="text-gray-400">
        I’m building tools to track performance, analyze trends, and understand progress over time.
        Most of what I build starts with something I want to use myself — then evolves into a full system.
      </p>

      <p className="text-gray-400">
        My main project right now is a golf tracking app with a full scorecard system, course builder,
        and detailed stats tracking. Alongside that, I’m building a personal dashboard to connect
        everything into one place.
      </p>

      <p className="text-gray-400">
        I focus on building clean, fast, and practical applications using modern tools like Next.js,
        TypeScript, and Prisma.
      </p>

      <div className="pt-4">
        <a
          href="mailto:georgeddelp5@gmail.com"
          className="text-sm underline hover:text-gray-300"
        >
          Contact me
        </a>
      </div>
    </div>
  );
}