"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X, ChevronUp, ChevronDown, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  size: string
  toppings?: string[]
}

interface CartPopupProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}

export default function CartPopup({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartPopupProps) {
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setSubtotal(total)
  }, [items])

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="w-full max-w-md bg-black border-l border-gray-800 h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <div className="flex items-center">
                  <ShoppingCart className="mr-2" />
                  <h2 className="text-xl font-light">Your Cart ({items.length})</h2>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 mb-6">Your cart is empty</p>
                    <Button onClick={onClose} className="bg-white text-black hover:bg-gray-200">
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-6">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-4 pb-6 border-b border-gray-800">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.name}</h3>
                            <p>{formatPrice(item.price * item.quantity)}</p>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">
                            {item.size} {item.toppings && item.toppings.length > 0 && `• ${item.toppings.join(", ")}`}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center border border-gray-700">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-900"
                                disabled={item.quantity <= 1}
                              >
                                <ChevronDown size={16} />
                              </button>
                              <span className="w-8 h-8 flex items-center justify-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-900"
                              >
                                <ChevronUp size={16} />
                              </button>
                            </div>
                            <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-white">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 border-t border-gray-800">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between text-lg font-medium pt-4 border-t border-gray-800">
                      <span>Total</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-white text-black hover:bg-gray-200 mb-3">Checkout</Button>
                  <Button variant="outline" className="w-full border-gray-700" onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
