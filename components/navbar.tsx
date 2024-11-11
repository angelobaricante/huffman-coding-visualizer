'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "react-responsive"
import { Menu, Binary } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const NavItems = () => {
  const pathname = usePathname()
  
  return (
    <>
      <li>
        <Link 
          href="/" 
          className={`hover:underline ${pathname === '/' ? 'font-bold' : ''}`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link 
          href="/about" 
          className={`hover:underline ${pathname === '/about' ? 'font-bold' : ''}`}
        >
          About
        </Link>
      </li>
      <li>
        <Link 
          href="/team" 
          className={`hover:underline ${pathname === '/team' ? 'font-bold' : ''}`}
        >
          Team
        </Link>
      </li>
      <li>
        <Link 
          href="/contact" 
          className={`hover:underline ${pathname === '/contact' ? 'font-bold' : ''}`}
        >
          Contact
        </Link>
      </li>
    </>
  )
}

export function Navbar() {
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <header className="bg-pale-violet-red text-pale-violet-red-foreground shadow-md">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Binary className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">Huffman Coding</span>
        </div>
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-pale-violet-red-foreground text-pale-violet-red hover:bg-pale-violet-red hover:text-pale-violet-red-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-pale-violet-red text-pale-violet-red-foreground">
              <SheetHeader>
                <SheetTitle className="text-pale-violet-red-foreground">Menu</SheetTitle>
                <div className="mt-4">
                  <ul className="space-y-6">
                    <NavItems />
                  </ul>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ) : (
          <ul className="flex space-x-8">
            <NavItems />
          </ul>
        )}
      </nav>
    </header>
  )
}