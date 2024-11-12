import Link from "next/link"
import { Binary, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Binary className="w-6 h-6 mr-2" />
            <span className="text-lg font-semibold">Huffman Coding Visualizer</span>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/team" className="hover:text-primary transition-colors">
              Team
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Huffman Coding Visualizer. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/angelobaricante/huffman-coding-visualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub repository"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}