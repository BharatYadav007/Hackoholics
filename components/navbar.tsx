"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar({ activeSection = "hero" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [language, setLanguage] = useState("EN")

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "ES" : "EN")
  }

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#hero", section: "hero" },
    { name: "Our Story", href: "#story", section: "story" },
    { name: "Flavors", href: "#flavors", section: "flavors" },
    { name: "Stores", href: "#stores", section: "stores" },
    { name: "The Lab", href: "#lab", section: "lab" },
    { name: "Press", href: "#press", section: "press" },
    { name: "Social", href: "#social", section: "social" },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-black/90 backdrop-blur-md py-3" : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="z-10">
              <Image
                src="/placeholder.svg?height=50&width=150"
                alt="Gelato Artisans"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm tracking-wider hover:text-white transition-colors",
                    activeSection === item.section ? "text-white" : "text-gray-400",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={toggleLanguage}
                className="flex items-center text-sm tracking-wider text-gray-400 hover:text-white transition-colors"
              >
                <Globe size={16} className="mr-2" />
                {language}
              </button>
            </div>

            <button className="md:hidden z-10 text-white" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-2xl font-light tracking-wider hover:text-gray-300 transition-colors"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-12 flex items-center space-x-6">
              <button
                onClick={toggleLanguage}
                className="flex items-center text-sm tracking-wider text-gray-400 hover:text-white transition-colors"
              >
                <Globe size={16} className="mr-2" />
                {language}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
