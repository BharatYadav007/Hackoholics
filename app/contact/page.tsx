"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form submission logic would go here
    alert("Thank you for your message. We will get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

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
          Contact Us
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-light mb-8 tracking-wider">Get In Touch</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              We'd love to hear from you. Whether you have a question about our flavors, locations, catering services,
              or anything else, our team is ready to answer all your questions.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-gray-400 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-gray-300">info@gelatoartisans.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-gray-400 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p className="text-gray-300">+1 (212) 555-1234</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-gray-400 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Headquarters</h3>
                  <p className="text-gray-300">
                    123 Main Street
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-medium mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-gray-700 focus:border-white px-4 py-3 text-white outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-gray-700 focus:border-white px-4 py-3 text-white outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-gray-700 focus:border-white px-4 py-3 text-white outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-transparent border border-gray-700 focus:border-white px-4 py-3 text-white outline-none transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full border border-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
              >
                SEND MESSAGE
              </button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-light mb-8 tracking-wider">Franchise Opportunities</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Interested in bringing Gelato Artisans to your area? We're selectively expanding through strategic
            partnerships with passionate entrepreneurs who share our commitment to quality and excellence.
          </p>
          <a
            href="mailto:franchise@gelatoartisans.com"
            className="inline-block border border-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
          >
            LEARN MORE
          </a>
        </motion.div>
      </div>
    </div>
  )
}
