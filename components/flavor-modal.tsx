"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Minus, Plus, ShoppingCart, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface FlavorModalProps {
  isOpen: boolean
  onClose: () => void
  flavor: {
    id: string
    name: string
    description: string
    image: string
    price: string
    ingredients?: string[]
    allergens?: string[]
    nutritionalInfo?: {
      calories: string
      fat: string
      sugar: string
    }
  }
}

export default function FlavorModal({ isOpen, onClose, flavor }: FlavorModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [selectedSize, setSelectedSize] = useState("regular")
  const [selectedTopping, setSelectedTopping] = useState<string | null>(null)

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const sizes = [
    { id: "small", name: "Small", price: "-$1.00" },
    { id: "regular", name: "Regular", price: "" },
    { id: "large", name: "Large", price: "+$2.00" },
  ]

  const toppings = [
    { id: "chocolate", name: "Chocolate Shavings", price: "+$1.50" },
    { id: "caramel", name: "Caramel Drizzle", price: "+$1.50" },
    { id: "nuts", name: "Crushed Nuts", price: "+$2.00" },
    { id: "berries", name: "Fresh Berries", price: "+$2.50" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-black border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 flex items-center justify-center rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square">
                  <Image
                    src={flavor.image || "/placeholder.svg"}
                    alt={flavor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 flex flex-col">
                  <h2 className="text-3xl font-serif mb-2">{flavor.name}</h2>
                  <p className="text-2xl font-light mb-6">{flavor.price}</p>

                  <div className="mb-8">
                    <div className="flex border-b border-gray-800 mb-6">
                      <button
                        className={`pb-2 px-4 text-sm font-medium ${
                          activeTab === "description" ? "border-b-2 border-white" : "text-gray-400"
                        }`}
                        onClick={() => setActiveTab("description")}
                      >
                        Description
                      </button>
                      <button
                        className={`pb-2 px-4 text-sm font-medium ${
                          activeTab === "ingredients" ? "border-b-2 border-white" : "text-gray-400"
                        }`}
                        onClick={() => setActiveTab("ingredients")}
                      >
                        Ingredients
                      </button>
                      <button
                        className={`pb-2 px-4 text-sm font-medium ${
                          activeTab === "nutrition" ? "border-b-2 border-white" : "text-gray-400"
                        }`}
                        onClick={() => setActiveTab("nutrition")}
                      >
                        Nutrition
                      </button>
                    </div>

                    <div className="text-gray-300">
                      {activeTab === "description" && <p>{flavor.description}</p>}
                      {activeTab === "ingredients" && (
                        <div>
                          <h3 className="text-sm font-medium mb-2">Ingredients:</h3>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            {flavor.ingredients?.map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))}
                          </ul>
                          <h3 className="text-sm font-medium mt-4 mb-2">Allergens:</h3>
                          <p className="text-sm">{flavor.allergens?.join(", ")}</p>
                        </div>
                      )}
                      {activeTab === "nutrition" && (
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Calories:</span> {flavor.nutritionalInfo?.calories}
                          </p>
                          <p>
                            <span className="font-medium">Fat:</span> {flavor.nutritionalInfo?.fat}
                          </p>
                          <p>
                            <span className="font-medium">Sugar:</span> {flavor.nutritionalInfo?.sugar}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">Size</h3>
                    <div className="flex gap-3">
                      {sizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setSelectedSize(size.id)}
                          className={`px-4 py-2 text-sm border ${
                            selectedSize === size.id
                              ? "border-white bg-white text-black"
                              : "border-gray-700 hover:border-gray-500"
                          }`}
                        >
                          {size.name} {size.price}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm font-medium mb-3">Toppings</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {toppings.map((topping) => (
                        <button
                          key={topping.id}
                          onClick={() => setSelectedTopping(selectedTopping === topping.id ? null : topping.id)}
                          className={`px-4 py-2 text-sm border ${
                            selectedTopping === topping.id
                              ? "border-white bg-white text-black"
                              : "border-gray-700 hover:border-gray-500"
                          }`}
                        >
                          {topping.name} {topping.price}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center border border-gray-700">
                      <button
                        onClick={decreaseQuantity}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-900"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 h-10 flex items-center justify-center">{quantity}</span>
                      <button
                        onClick={increaseQuantity}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-900"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-auto">
                    <Button className="flex-1 bg-white text-black hover:bg-gray-200">
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                    <Button variant="outline" size="icon" className="border-gray-700 hover:border-white">
                      <Heart className="h-4 w-4" />
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
