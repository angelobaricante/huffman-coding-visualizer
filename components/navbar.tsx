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

const NavItems = () => {
  const pathname = usePathname()

  return (
    <>
      <Link 
        href="/" 
        className={`hover:text-primary ${pathname === '/' ? 'font-bold' : ''}`}
      >
        Home
      </Link>
      <Link 
        href="/about" 
        className={`hover:text-primary ${pathname === '/about' ? 'font-bold' : ''}`}
      >
        About
      </Link>
      <Link 
        href="/team" 
        className={`hover:text-primary ${pathname === '/team' ? 'font-bold' : ''}`}
      >
        Team
      </Link>
      <Link 
        href="/contact" 
        className={`hover:text-primary ${pathname === '/contact' ? 'font-bold' : ''}`}
      >
        Contact
      </Link>
    </>
  )
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <Binary className="w-6 h-6 mr-2" />
            Huffman Coding
          </Link>
          <div className="hidden md:flex space-x-8">
            <NavItems />
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <div className="mt-4 flex flex-col space-y-4">
                  <NavItems />
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}