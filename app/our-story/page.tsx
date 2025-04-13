"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export default function OurStoryPage() {
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
          Our Story
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[4/5] w-full">
              <Image src="/placeholder.svg?height=800&width=600" alt="Our founder" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-2xl md:text-3xl font-light mb-8 tracking-wider">The Beginning</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Founded in 2010 by Master Gelato Artisan Marco Rossi, our journey began with a simple mission: to create
              the most exquisite gelato using traditional Italian methods and the finest ingredients from around the
              world.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Marco's passion for gelato was cultivated during his childhood in Naples, where he spent summers learning
              the craft from his grandfather, a renowned gelato maker. After years of perfecting his skills across
              Italy, Marco brought his expertise and vision to create what is now known as Gelato Artisans.
            </p>
            <p className="text-gray-300 leading-relaxed">
              What began as a small artisanal shop has grown into an international brand, but our commitment to quality
              and tradition remains unchanged. Every flavor is still crafted in small batches, ensuring the perfect
              texture and depth of flavor that has become our signature.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-light mb-8 tracking-wider text-center">Our Philosophy</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-300 mb-6 leading-relaxed">
              At Gelato Artisans, we believe that exceptional gelato comes from exceptional ingredients. We source only
              the finest raw materials – from Sicilian pistachios to Madagascar vanilla beans – and transform them into
              unforgettable flavors through our meticulous process.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We honor tradition while embracing innovation, constantly exploring new flavor combinations while staying
              true to the authentic methods that make gelato superior to ordinary ice cream. Lower fat content, slower
              churning, and warmer serving temperatures allow our flavors to truly shine.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-light mb-4">Passion</h3>
            <p className="text-gray-400">
              Every scoop is crafted with love and dedication to the art of gelato making.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                />
              </svg>
            </div>
            <h3 className="text-xl font-light mb-4">Quality</h3>
            <p className="text-gray-400">
              We never compromise on ingredients, sourcing the finest raw materials from around the world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-light mb-4">Tradition</h3>
            <p className="text-gray-400">
              We honor authentic Italian methods while embracing innovative flavor combinations.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="relative aspect-[21/9] w-full mb-24"
        >
          <Image
            src="/placeholder.svg?height=900&width=1900"
            alt="Our gelato production"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-light mb-8 tracking-wider">Join Our Journey</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            We invite you to experience the artistry and passion that goes into every scoop of our gelato. Visit one of
            our locations or follow us on social media to stay updated on our latest creations and events.
          </p>
          <Link
            href="/locations"
            className="inline-block border border-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
          >
            FIND A LOCATION
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
