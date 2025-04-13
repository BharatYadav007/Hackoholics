"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export default function FlavorsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Flavors" },
    { id: "classic", name: "Classic" },
    { id: "signature", name: "Signature" },
    { id: "seasonal", name: "Seasonal" },
    { id: "vegan", name: "Vegan" },
  ]

  const flavors = [
    {
      id: 1,
      name: "Pistachio Dream",
      description: "Premium pistachios from Sicily, slow-roasted and blended into our signature cream base.",
      image: "/placeholder.svg?height=600&width=600",
      category: "signature",
    },
    {
      id: 2,
      name: "Madagascar Vanilla",
      description: "Pure Madagascar vanilla beans infused in our cream for 24 hours to extract maximum flavor.",
      image: "/placeholder.svg?height=600&width=600",
      category: "classic",
    },
    {
      id: 3,
      name: "Dark Chocolate",
      description: "72% single-origin dark chocolate from Ecuador, creating a rich and intense flavor profile.",
      image: "/placeholder.svg?height=600&width=600",
      category: "classic",
    },
    {
      id: 4,
      name: "Salted Caramel",
      description:
        "Handcrafted caramel with fleur de sel, swirled into our creamy base for a sweet and salty experience.",
      image: "/placeholder.svg?height=600&width=600",
      category: "signature",
    },
    {
      id: 5,
      name: "Strawberry Fields",
      description: "Fresh seasonal strawberries, lightly macerated and folded into our cream base.",
      image: "/placeholder.svg?height=600&width=600",
      category: "seasonal",
    },
    {
      id: 6,
      name: "Coconut Passion",
      description: "Creamy coconut milk base with tropical passion fruit swirls for a dairy-free delight.",
      image: "/placeholder.svg?height=600&width=600",
      category: "vegan",
    },
    {
      id: 7,
      name: "Hazelnut Rocher",
      description: "Premium hazelnuts roasted to perfection, with chocolate pieces throughout.",
      image: "/placeholder.svg?height=600&width=600",
      category: "signature",
    },
    {
      id: 8,
      name: "Mint Chocolate",
      description: "Fresh mint leaves steeped in our cream base, with dark chocolate chips folded in.",
      image: "/placeholder.svg?height=600&width=600",
      category: "classic",
    },
    {
      id: 9,
      name: "Mango Tango",
      description: "Alphonso mangoes blended with a hint of lime for a refreshing tropical experience.",
      image: "/placeholder.svg?height=600&width=600",
      category: "seasonal",
    },
  ]

  const filteredFlavors =
    selectedCategory === "all" ? flavors : flavors.filter((flavor) => flavor.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-light mb-12 tracking-wider text-center"
        >
          Our Artisanal Flavors
        </motion.h1>

        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 text-sm tracking-wider transition-colors ${
                  selectedCategory === category.id ? "bg-white text-black" : "border border-gray-700 hover:border-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFlavors.map((flavor) => (
            <motion.div
              key={flavor.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden mb-4">
                <Image
                  src={flavor.image || "/placeholder.svg"}
                  alt={flavor.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 border border-white text-sm tracking-wider">VIEW DETAILS</span>
                </div>
              </div>
              <h3 className="text-xl font-light mb-2">{flavor.name}</h3>
              <p className="text-gray-400 text-sm">{flavor.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
