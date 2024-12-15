import Link from "next/link"
import { Binary, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-gray-200/20 bg-transparent py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center">
            <Binary className="mr-2 h-5 w-5" />
            <span className="text-sm font-semibold">Huffmen Visualizer</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            {/* <Link href="/team" className="hover:text-primary transition-colors">Team</Link> */}
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            <p className="text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Huffmen Visualizer
            </p>
            <a
              href="https://github.com/angelobaricante/huffman-coding-visualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub repository"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

