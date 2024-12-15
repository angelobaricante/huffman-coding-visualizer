'use client'

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Binary, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from '@/components/ModeToggle'

const NavItems = ({ onClick }: { onClick: () => void }) => {
  const pathname = usePathname()

  return (
    <>
      <Link 
        href="/" 
        onClick={onClick} 
        className={`hover:text-primary ${pathname === '/' ? 'font-bold' : ''}`}
      >
        Home
      </Link>
      <Link 
        href="/about" 
        onClick={onClick} 
        className={`hover:text-primary ${pathname === '/about' ? 'font-bold' : ''}`}
      >
        About
      </Link>
      {/* <Link 
        href="/team" 
        onClick={onClick} 
        className={`hover:text-primary ${pathname === '/team' ? 'font-bold' : ''}`}
      >
        Team
      </Link> */}
      <Link 
        href="/contact" 
        onClick={onClick} 
        className={`hover:text-primary ${pathname === '/contact' ? 'font-bold' : ''}`}
      >
        Contact
      </Link>
    </>
  )
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavItemClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/20 backdrop-blur-sm bg-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <Binary className="w-6 h-6 mr-2" />
            Huffmen Visualizer
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <NavItems onClick={() => {}} />
            <ModeToggle />
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white/80 dark:bg-gray-900 backdrop-blur-sm">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <div className="mt-4 flex flex-col space-y-4">
                  <NavItems onClick={handleNavItemClick} />
                  <ModeToggle />
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

