"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart } from "lucide-react"

interface FloatingCartButtonProps {
  itemCount: number
  onClick: () => void
}

export default function FloatingCartButton({ itemCount, onClick }: FloatingCartButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-lg"
      onClick={onClick}
    >
      <ShoppingCart size={20} />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium"
          >
            {itemCount}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
