"use client"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuickViewProps {
  isOpen: boolean
  onClose: () => void
  flavor: {
    id: string
    name: string
    description: string
    image: string
    price: string
    category: string
  }
  onAddToCart: () => void
}

export default function QuickView({ isOpen, onClose, flavor, onAddToCart }: QuickViewProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-black border border-gray-800 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 flex items-center justify-center rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X size={16} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square">
                  <Image
                    src={flavor.image || "/placeholder.mp4"}
                    alt={flavor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 flex flex-col">
                  <div className="mb-2">
                    <span className="text-xs uppercase tracking-wider px-2 py-1 bg-gray-800 rounded-full">
                      {flavor.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif mb-2">{flavor.name}</h2>
                  <p className="text-xl font-light mb-4">{flavor.price}</p>
                  <p className="text-gray-300 text-sm mb-6">{flavor.description}</p>

                  <div className="flex gap-3 mt-auto">
                    <Button
                      className="flex-1 bg-white text-black hover:bg-gray-200"
                      onClick={() => {
                        onAddToCart()
                        onClose()
                      }}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Quick Add
                    </Button>
                    <Button variant="outline" onClick={onClose} className="flex-1 border-gray-700 hover:border-white">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
