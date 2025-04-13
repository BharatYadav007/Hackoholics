"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronDown, Volume2, VolumeX, ShoppingCart, Heart, Search, Menu, X } from "lucide-react"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import FlavorModal from "@/components/flavor-modal"
import CartPopup from "@/components/cart-popup"
import QuickView from "@/components/quick-view"
import Notification from "@/components/notification"
import FloatingCartButton from "@/components/floating-cart-button"

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  size: string
  toppings?: string[]
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [muted, setMuted] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeSection, setActiveSection] = useState("hero")
  const [selectedFlavor, setSelectedFlavor] = useState<any>(null)
  const [isFlavorModalOpen, setIsFlavorModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [quickViewFlavor, setQuickViewFlavor] = useState<any>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [notification, setNotification] = useState({ message: "", type: "success", isVisible: false })
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const heroRef = useRef(null)
  const storyRef = useRef(null)
  const flavorsRef = useRef(null)
  const storesRef = useRef(null)
  const labRef = useRef(null)
  const pressRef = useRef(null)
  const socialRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const slides = [
    {
      title: "Gelato, but make it art.",
      subtitle: "Crafted with passion, served with style",
      image: "/placeholder.svg?height=1080&width=1920",
    },
    {
      title: "Tradition meets innovation",
      subtitle: "Where Italian heritage embraces modern creativity",
      image: "/placeholder.svg?height=1080&width=1920",
    },
    {
      title: "Taste the extraordinary",
      subtitle: "Unexpected flavors, unforgettable experiences",
      image: "/placeholder.svg?height=1080&width=1920",
    },
  ]

  const categories = [
    { id: "all", name: "All Flavors" },
    { id: "classic", name: "Classic" },
    { id: "signature", name: "Signature" },
    { id: "seasonal", name: "Seasonal" },
    { id: "vegan", name: "Vegan" },
  ]

  const flavors = [
    {
      id: "1",
      name: "Pistachio Dream",
      description: "Premium pistachios from Sicily, slow-roasted and blended into our signature cream base.",
      image: "/placeholder.svg?height=600&width=600",
      color: "bg-[#9BC88B]",
      category: "signature",
      price: "$8.95",
      ingredients: [
        "Organic milk",
        "Organic cream",
        "Sicilian pistachios",
        "Organic cane sugar",
        "Egg yolks",
        "Sea salt",
      ],
      allergens: ["Milk", "Eggs", "Nuts"],
      nutritionalInfo: {
        calories: "220 kcal per 100g",
        fat: "14g",
        sugar: "18g",
      },
    },
    {
      id: "2",
      name: "Madagascar Vanilla",
      description: "Pure Madagascar vanilla beans infused in our cream for 24 hours to extract maximum flavor.",
      image: "/placeholder.svg?height=600&width=600",
      color: "bg-[#F2E8DC]",
      category: "classic",
      price: "$7.95",
      ingredients: ["Organic milk", "Organic cream", "Madagascar vanilla beans", "Organic cane sugar", "Egg yolks"],
      allergens: ["Milk", "Eggs"],
      nutritionalInfo: {
        calories: "210 kcal per 100g",
        fat: "12g",
        sugar: "20g",
      },
    },
    {
      id: "3",
      name: "Dark Chocolate",
      description: "72% single-origin dark chocolate from Ecuador, creating a rich and intense flavor profile.",
      image: "/placeholder.svg?height=600&width=600",
      color: "bg-[#4A3636]",
      category: "classic",
      price: "$7.95",
      ingredients: [
        "Organic milk",
        "Organic cream",
        "Ecuadorian dark chocolate (72%)",
        "Organic cane sugar",
        "Egg yolks",
        "Cocoa powder",
      ],
      allergens: ["Milk", "Eggs", "May contain traces of nuts"],
      nutritionalInfo: {
        calories: "240 kcal per 100g",
        fat: "15g",
        sugar: "22g",
      },
    },
    {
      id: "4",
      name: "Salted Caramel",
      description:
        "Handcrafted caramel with fleur de sel, swirled into our creamy base for a sweet and salty experience.",
      image: "/placeholder.svg?height=600&width=600",
      color: "bg-[#D4A373]",
      category: "signature",
      price: "$8.50",
      ingredients: [
        "Organic milk",
        "Organic cream",
        "Organic cane sugar",
        "Egg yolks",
        "Fleur de sel",
        "Natural caramel",
      ],
      allergens: ["Milk", "Eggs"],
      nutritionalInfo: {
        calories: "230 kcal per 100g",
        fat: "13g",
        sugar: "24g",
      },
    },
    {
      id: "5",
      name: "Strawberry Fields",
      description: "Fresh seasonal strawberries, lightly macerated and folded into our cream base.",
      image: "/placeholder.svg?height=600&width=600",
      color: "bg-[#E5989B]",
      category: "seasonal",
      price: "$8.50",
      ingredients: [
        "Organic milk",
        "Organic cream",
        "Fresh strawberries",
        "Organic cane sugar",
        "Egg yolks",
        "Lemon zest",
      ],
      allergens: ["Milk", "Eggs"],
      nutritionalInfo: {
        calories: "200 kcal per 100g",
        fat: "11g",
        sugar: "21g",
      },
    },
    {
      id: "6",
      name: "Coconut Passion",
      description: "Creamy coconut milk base with tropical passion fruit swirls for a dairy-free delight.",
      image: "/placeholder.svg?height=600&width=600",
      color: "bg-[#F8F4EA]",
      category: "vegan",
      price: "$9.50",
      ingredients: [
        "Coconut milk",
        "Coconut cream",
        "Passion fruit puree",
        "Organic cane sugar",
        "Natural stabilizers",
      ],
      allergens: ["Coconut"],
      nutritionalInfo: {
        calories: "190 kcal per 100g",
        fat: "12g",
        sugar: "18g",
      },
    },
    {
      id: "7",
      name: "Hazelnut Rocher",
      description: "Premium hazelnuts roasted to perfection, with chocolate pieces throughout.",
      image: "/placeholder.svg?height=600&width=600",
      color: "bg-[#8B7E74]",
      category: "signature",
      price: "$9.95",
      ingredients: [
        "Organic milk",
        "Organic cream",
        "Roasted hazelnuts",
        "Chocolate pieces",
        "Organic cane sugar",
        "Egg yolks",
      ],
      allergens: ["Milk", "Eggs", "Nuts"],
      nutritionalInfo: {
        calories: "250 kcal per 100g",
        fat: "16g",
        sugar: "20g",
      },
    },
    {
      id: "8",
      name: "Mint Chocolate",
      description: "Fresh mint leaves steeped in our cream base, with dark chocolate chips folded in.",
      image: "/placeholder.svg?height=600&width=600",
      color: "bg-[#A7D7C5]",
      category: "classic",
      price: "$8.50",
      ingredients: [
        "Organic milk",
        "Organic cream",
        "Fresh mint leaves",
        "Dark chocolate chips",
        "Organic cane sugar",
        "Egg yolks",
      ],
      allergens: ["Milk", "Eggs", "May contain traces of nuts"],
      nutritionalInfo: {
        calories: "220 kcal per 100g",
        fat: "14g",
        sugar: "19g",
      },
    },
    {
      id: "9",
      name: "Mango Tango",
      description: "Alphonso mangoes blended with a hint of lime for a refreshing tropical experience.",
      image: "/placeholder.svg?height=600&width=600",
      color: "bg-[#FFB347]",
      category: "seasonal",
      price: "$8.95",
      ingredients: [
        "Organic milk",
        "Organic cream",
        "Alphonso mango puree",
        "Lime juice",
        "Organic cane sugar",
        "Egg yolks",
      ],
      allergens: ["Milk", "Eggs"],
      nutritionalInfo: {
        calories: "210 kcal per 100g",
        fat: "12g",
        sugar: "22g",
      },
    },
  ]

  const stores = [
    {
      city: "Buenos Aires",
      address: "Av. Alvear 1750, Recoleta",
      image: "/placeholder.svg?height=800&width=600",
      accent: "border-[#F4ACB7]",
    },
    {
      city: "Miami",
      address: "240 Lincoln Road, Miami Beach",
      image: "/placeholder.svg?height=800&width=600",
      accent: "border-[#9BC88B]",
    },
    {
      city: "Rome",
      address: "Via del Corso 42, Centro Storico",
      image: "/placeholder.svg?height=800&width=600",
      accent: "border-[#D4A373]",
    },
    {
      city: "New York",
      address: "372 West Broadway, SoHo",
      image: "/placeholder.svg?height=800&width=600",
      accent: "border-[#4A4E69]",
    },
  ]

  const press = [
    { name: "Vogue", logo: "/placeholder.svg?height=100&width=200" },
    { name: "GQ", logo: "/placeholder.svg?height=100&width=200" },
    { name: "Food & Wine", logo: "/placeholder.svg?height=100&width=200" },
    { name: "Netflix", logo: "/placeholder.svg?height=100&width=200" },
    { name: "Condé Nast Traveler", logo: "/placeholder.svg?height=100&width=200" },
    { name: "Vanity Fair", logo: "/placeholder.svg?height=100&width=200" },
  ]

  const socialPosts = [
    { image: "/placeholder.svg?height=600&width=600" },
    { image: "/placeholder.svg?height=600&width=600" },
    { image: "/placeholder.svg?height=600&width=600" },
    { image: "/placeholder.svg?height=600&width=600" },
    { image: "/placeholder.svg?height=600&width=600" },
    { image: "/placeholder.svg?height=600&width=600" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loading) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 6000)

    return () => clearInterval(interval)
  }, [loading, slides.length])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      const sections = [
        { ref: heroRef, id: "hero" },
        { ref: storyRef, id: "story" },
        { ref: flavorsRef, id: "flavors" },
        { ref: storesRef, id: "stores" },
        { ref: labRef, id: "lab" },
        { ref: pressRef, id: "press" },
        { ref: socialRef, id: "social" },
      ]

      for (const section of sections) {
        if (!section.ref.current) continue

        const element = section.ref.current
        const rect = element.getBoundingClientRect()
        const topPosition = rect.top + window.scrollY
        const bottomPosition = rect.bottom + window.scrollY

        if (scrollPosition >= topPosition && scrollPosition <= bottomPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMute = () => {
    setMuted(!muted)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const openFlavorModal = (flavor) => {
    setSelectedFlavor(flavor)
    setIsFlavorModalOpen(true)
  }

  const openQuickView = (flavor) => {
    setQuickViewFlavor(flavor)
    setIsQuickViewOpen(true)
  }

  const addToCart = (flavor, quantity = 1, size = "regular", toppings = []) => {
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.id === flavor.id && item.size === size && JSON.stringify(item.toppings) === JSON.stringify(toppings),
    )

    if (existingItemIndex !== -1) {
      const updatedItems = [...cartItems]
      updatedItems[existingItemIndex].quantity += quantity
      setCartItems(updatedItems)
    } else {
      const newItem = {
        id: flavor.id,
        name: flavor.name,
        image: flavor.image,
        price: Number.parseFloat(flavor.price.replace("$", "")),
        quantity,
        size,
        toppings,
      }
      setCartItems([...cartItems, newItem])
    }

    showNotification(`${flavor.name} added to cart`, "success")
  }

  const updateCartItemQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeCartItem(id)
      return
    }

    const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    setCartItems(updatedItems)
  }

  const removeCartItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedItems)
    showNotification("Item removed from cart", "info")
  }

  const showNotification = (message, type) => {
    setNotification({
      message,
      type: type as "success" | "error" | "info",
      isVisible: true,
    })
  }

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }))
  }

  const filteredFlavors = flavors.filter((flavor) => {
    const matchesCategory = selectedCategory === "all" || flavor.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      flavor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flavor.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          >
            <div className="font-cursive text-6xl tracking-wide text-white">La Crème Glacée</div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-50 flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="font-cursive text-3xl tracking-wide">La Crème Glacée</div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              <a
                href="#hero"
                className="text-2xl font-light"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("hero")
                  setIsMobileMenuOpen(false)
                }}
              >
                Home
              </a>
              <a
                href="#story"
                className="text-2xl font-light"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("story")
                  setIsMobileMenuOpen(false)
                }}
              >
                Our Story
              </a>
              <a
                href="#flavors"
                className="text-2xl font-light"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("flavors")
                  setIsMobileMenuOpen(false)
                }}
              >
                Flavors
              </a>
              <a
                href="#stores"
                className="text-2xl font-light"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("stores")
                  setIsMobileMenuOpen(false)
                }}
              >
                Stores
              </a>
              <a
                href="#lab"
                className="text-2xl font-light"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("lab")
                  setIsMobileMenuOpen(false)
                }}
              >
                The Lab
              </a>
            </nav>
            <div className="mt-auto">
              <Button
                className="w-full bg-white text-black hover:bg-gray-200 mb-4"
                onClick={() => {
                  setIsCartOpen(true)
                  setIsMobileMenuOpen(false)
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> View Cart (
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="md:hidden mr-4" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={24} />
              </button>
              <div className="font-cursive text-3xl tracking-wide">La Crème Glacée</div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("hero")
                }}
                className={`text-sm tracking-wider hover:text-white transition-colors ${
                  activeSection === "hero" ? "text-white" : "text-gray-400"
                }`}
              >
                Home
              </a>
              <a
                href="#story"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("story")
                }}
                className={`text-sm tracking-wider hover:text-white transition-colors ${
                  activeSection === "story" ? "text-white" : "text-gray-400"
                }`}
              >
                Our Story
              </a>
              <a
                href="#flavors"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("flavors")
                }}
                className={`text-sm tracking-wider hover:text-white transition-colors ${
                  activeSection === "flavors" ? "text-white" : "text-gray-400"
                }`}
              >
                Flavors
              </a>
              <a
                href="#stores"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("stores")
                }}
                className={`text-sm tracking-wider hover:text-white transition-colors ${
                  activeSection === "stores" ? "text-white" : "text-gray-400"
                }`}
              >
                Stores
              </a>
              <a
                href="#lab"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("lab")
                }}
                className={`text-sm tracking-wider hover:text-white transition-colors ${
                  activeSection === "lab" ? "text-white" : "text-gray-400"
                }`}
              >
                The Lab
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-gray-400 hover:text-white transition-colors relative"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-xs font-medium">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-4"
              >
                <div className="flex items-center border-b border-gray-700 pb-2">
                  <Search size={20} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search flavors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent w-full outline-none"
                    autoFocus
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-white">
                      <X size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Sound Control */}
      <button
        onClick={toggleMute}
        className="fixed bottom-8 left-8 z-30 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Floating Cart Button (Mobile) */}
      <div className="md:hidden">
        <FloatingCartButton
          itemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onClick={() => setIsCartOpen(true)}
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full"
            >
              <Image
                src={slides[currentSlide].image || "/placeholder.svg"}
                alt="Gelato"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center max-w-4xl px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-serif mb-4 tracking-tight">{slides[currentSlide].title}</h1>
                <p className="text-xl md:text-2xl font-light text-gray-200 mb-8">{slides[currentSlide].subtitle}</p>
              </motion.div>
            </AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black rounded-none px-8 py-6 text-lg"
                onClick={() => scrollToSection("flavors")}
              >
                Discover Our Flavors
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
          <span className="text-xs tracking-widest mb-2">SCROLL</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} id="story" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative aspect-[3/4] w-full">
                <Image src="/placeholder.svg?height=900&width=600" alt="Our story" fill className="object-cover" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-xl"
            >
              <h2 className="text-3xl md:text-5xl font-serif mb-8">Our Story</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Founded in 2010 by Master Gelato Artisan Marco Rossi, our journey began with a simple mission: to create
                the most exquisite gelato using traditional Italian methods and the finest ingredients from around the
                world.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                What began as a small artisanal shop has grown into an international brand, but our commitment to
                quality and tradition remains unchanged. Every flavor is still crafted in small batches, ensuring the
                perfect texture and depth of flavor that has become our signature.
              </p>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black rounded-none px-6"
                onClick={() => (window.location.href = "/our-story")}
              >
                Read More
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flavors Section */}
      <section ref={flavorsRef} id="flavors" className="py-24 md:py-32 bg-neutral-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Our Signature Flavors</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Discover our collection of artisanal gelato, crafted with premium ingredients and inspired by both Italian
              tradition and contemporary culinary innovation.
            </p>
          </motion.div>

          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 text-sm tracking-wider transition-colors ${
                    selectedCategory === category.id
                      ? "bg-white text-black"
                      : "border border-gray-700 hover:border-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFlavors.map((flavor, index) => (
              <motion.div
                key={flavor.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden mb-4" onClick={() => openQuickView(flavor)}>
                  <div className={cn("absolute inset-0", flavor.color, "opacity-20")}></div>
                  <Image
                    src={flavor.image || "/placeholder.svg"}
                    alt={flavor.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-luminosity group-hover:mix-blend-normal"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 border border-white text-sm tracking-wider">QUICK VIEW</span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-serif mb-2">{flavor.name}</h3>
                    <p className="text-gray-400">{flavor.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 mt-1">
                    <button
                      onClick={() => addToCart(flavor)}
                      className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <ShoppingCart size={16} />
                    </button>
                    <button
                      onClick={() => openFlavorModal(flavor)}
                      className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:border-white transition-colors"
                    >
                      <Heart size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-lg font-light mt-2">{flavor.price}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mt-16"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black rounded-none px-8"
              onClick={() => (window.location.href = "/flavors")}
            >
              View All Flavors
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stores Section */}
      <section ref={storesRef} id="stores" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Our Flagship Stores</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Visit one of our elegant boutiques around the world, each designed as a unique sensory experience that
              reflects the culture and spirit of its location.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stores.map((store, index) => (
              <motion.div
                key={store.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group cursor-pointer"
              >
                <div className={cn("relative aspect-[3/4] overflow-hidden mb-6 border-b-4", store.accent)}>
                  <Image
                    src={store.image || "/placeholder.svg"}
                    alt={store.city}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                    <h3 className="text-2xl font-serif mb-1">{store.city}</h3>
                    <p className="text-gray-300">{store.address}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mt-16"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black rounded-none px-8"
              onClick={() => (window.location.href = "/locations")}
            >
              Find a Store
            </Button>
          </motion.div>
        </div>
      </section>

      {/* The Lab Section */}
      <section ref={labRef} id="lab" className="py-24 md:py-32 bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-2 lg:order-1 max-w-xl"
            >
              <h2 className="text-3xl md:text-5xl font-serif mb-8">The Lab</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Welcome to our creative workshop, where tradition meets innovation. In The Lab, our master gelato
                artisans experiment with unexpected flavor combinations, textures, and presentations to push the
                boundaries of what gelato can be.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                From collaborations with renowned chefs to limited-edition collections inspired by art, fashion, and pop
                culture, The Lab is where our most daring and avant-garde creations come to life.
              </p>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black rounded-none px-6"
                onClick={() => {
                  showNotification("Coming soon! Join our waitlist for exclusive Lab tastings.", "info")
                }}
              >
                Explore The Lab
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-square w-full">
                <Image src="/placeholder.svg?height=800&width=800" alt="The Lab" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Press & Collaborations */}
      <section ref={pressRef} id="press" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Press & Collaborations</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our artisanal approach to gelato has captured the attention of global media and led to exciting
              collaborations with leading brands in fashion, art, and entertainment.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {press.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group cursor-pointer"
                onClick={() => showNotification(`Featured in ${item.name}`, "info")}
              >
                <div className="relative aspect-[3/2] bg-neutral-900 flex items-center justify-center p-6 transition-all duration-300 group-hover:bg-neutral-800">
                  <Image
                    src={item.logo || "/placeholder.svg"}
                    alt={item.name}
                    width={150}
                    height={75}
                    className="object-contain filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section ref={socialRef} id="social" className="py-24 md:py-32 bg-neutral-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Follow Our Journey</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Join our community on Instagram and share your gelato moments with us using #GelatoArtisans
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {socialPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group cursor-pointer"
                onClick={() => showNotification("Follow us on Instagram for more delicious content!", "info")}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt="Instagram post"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8"
                    >
                      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                      <path d="M18 10a6 6 0 0 0-12 0"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mt-16"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black rounded-none px-8"
              onClick={() => window.open("https://instagram.com", "_blank")}
            >
              Follow Us @GelatoArtisans
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Background"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-6">Join Our World</h2>
            <p className="text-lg text-gray-300 mb-8">
              Subscribe to our newsletter for exclusive offers, new flavor announcements, and invitations to special
              events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-transparent border border-white/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white"
              />
              <Button
                className="bg-white text-black hover:bg-gray-200 rounded-none px-8"
                onClick={() => showNotification("Thank you for subscribing to our newsletter!", "success")}
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Modals and Popups */}
      {selectedFlavor && (
        <FlavorModal isOpen={isFlavorModalOpen} onClose={() => setIsFlavorModalOpen(false)} flavor={selectedFlavor} />
      )}

      {quickViewFlavor && (
        <QuickView
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
          flavor={quickViewFlavor}
          onAddToCart={() => addToCart(quickViewFlavor)}
        />
      )}

      <CartPopup
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeCartItem}
      />

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  )
}
