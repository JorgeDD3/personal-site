"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `transition ${
      pathname === path
        ? "text-white"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav className="w-full border-b border-white/10 bg-black/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link href="/" className="font-semibold text-lg">
          GD3
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/projects" className={linkClass("/projects")}>Projects</Link>
          <Link href="/about" className={linkClass("/about")}>About</Link>
          <Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}