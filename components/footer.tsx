import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-900 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="font-cursive text-3xl tracking-wide mb-6">La Crème Glacée</div>
            <p className="text-gray-400 mb-6">
              Artisanal ice cream crafted with passion, tradition, and the finest ingredients from around the world.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
              >
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif mb-6">Explore</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Flavors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Stores
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  The Lab
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif mb-6">Contact</h3>
            <address className="not-italic text-gray-400 mb-4">
              Headquarters
              <br />
              123 Crème Avenue
              <br />
              Paris, France 75001
            </address>
            <p className="text-gray-400 mb-2">info@lacremglacee.com</p>
            <p className="text-gray-400">+33 01 2345 6789</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} La Crème Glacée. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <button className="text-sm text-gray-500 hover:text-white transition-colors">EN</button>
            <span className="text-gray-700">|</span>
            <button className="text-sm text-gray-500 hover:text-white transition-colors">ES</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
