"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, MapPin, Phone, Clock } from "lucide-react"

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState(null)

  const locations = [
    {
      id: 1,
      name: "Downtown Flagship",
      address: "123 Main Street, New York, NY 10001",
      phone: "+1 (212) 555-1234",
      hours: "Mon-Sun: 11am - 10pm",
      image: "/placeholder.svg?height=600&width=800",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    {
      id: 2,
      name: "Uptown Boutique",
      address: "456 Park Avenue, New York, NY 10022",
      phone: "+1 (212) 555-5678",
      hours: "Mon-Sun: 11am - 9pm",
      image: "/placeholder.svg?height=600&width=800",
      coordinates: { lat: 40.7631, lng: -73.9712 },
    },
    {
      id: 3,
      name: "Brooklyn Artisanal",
      address: "789 Bedford Avenue, Brooklyn, NY 11211",
      phone: "+1 (718) 555-9012",
      hours: "Mon-Sun: 12pm - 10pm",
      image: "/placeholder.svg?height=600&width=800",
      coordinates: { lat: 40.7195, lng: -73.9573 },
    },
    {
      id: 4,
      name: "Miami Beach",
      address: "321 Ocean Drive, Miami Beach, FL 33139",
      phone: "+1 (305) 555-3456",
      hours: "Mon-Sun: 10am - 11pm",
      image: "/placeholder.svg?height=600&width=800",
      coordinates: { lat: 25.7825, lng: -80.1324 },
    },
    {
      id: 5,
      name: "Los Angeles",
      address: "654 Rodeo Drive, Beverly Hills, CA 90210",
      phone: "+1 (310) 555-7890",
      hours: "Mon-Sun: 11am - 10pm",
      image: "/placeholder.svg?height=600&width=800",
      coordinates: { lat: 34.0736, lng: -118.4004 },
    },
  ]

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
          Our Locations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 max-w-3xl mx-auto mb-16 text-center leading-relaxed"
        >
          Visit one of our elegant boutiques to experience our artisanal gelato. Each location offers our full range of
          signature flavors, along with exclusive seasonal creations.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {locations.map((location) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + location.id * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedLocation(location)}
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                <Image
                  src={location.image || "/placeholder.svg"}
                  alt={location.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 border border-white text-sm tracking-wider">VIEW DETAILS</span>
                </div>
              </div>
              <h3 className="text-xl font-light mb-2">{location.name}</h3>
              <div className="flex items-start mb-2">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-gray-400" />
                <p className="text-gray-300 text-sm">{location.address}</p>
              </div>
              <div className="flex items-start mb-2">
                <Phone size={16} className="mr-2 mt-1 flex-shrink-0 text-gray-400" />
                <p className="text-gray-300 text-sm">{location.phone}</p>
              </div>
              <div className="flex items-start">
                <Clock size={16} className="mr-2 mt-1 flex-shrink-0 text-gray-400" />
                <p className="text-gray-300 text-sm">{location.hours}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-light mb-8 tracking-wider">Coming Soon</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            We're expanding to bring our artisanal gelato to more locations. Stay tuned for announcements about our
            upcoming boutiques in Chicago, San Francisco, and international locations.
          </p>
          <Link
            href="/contact"
            className="inline-block border border-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
          >
            CONTACT US
          </Link>
        </motion.div>
      </div>

      {/* Location Detail Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="relative aspect-video">
              <Image
                src={selectedLocation.image || "/placeholder.svg"}
                alt={selectedLocation.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 flex items-center justify-center rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-light mb-4">{selectedLocation.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start mb-4">
                    <MapPin size={20} className="mr-3 mt-1 flex-shrink-0 text-gray-400" />
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-gray-300">{selectedLocation.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start mb-4">
                    <Phone size={20} className="mr-3 mt-1 flex-shrink-0 text-gray-400" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-gray-300">{selectedLocation.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock size={20} className="mr-3 mt-1 flex-shrink-0 text-gray-400" />
                    <div>
                      <h3 className="font-medium mb-1">Hours</h3>
                      <p className="text-gray-300">{selectedLocation.hours}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 h-[200px] flex items-center justify-center">
                  <p className="text-gray-400">Interactive Map Would Go Here</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800">
                <h3 className="font-medium mb-4">About This Location</h3>
                <p className="text-gray-300 mb-4">
                  Our {selectedLocation.name} boutique offers the full Gelato Artisans experience in an elegant setting.
                  Enjoy our signature flavors along with location-exclusive seasonal creations.
                </p>
                <p className="text-gray-300">
                  This location features indoor and outdoor seating, as well as takeaway options. We also offer catering
                  services for special events.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
