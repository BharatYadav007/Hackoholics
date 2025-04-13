import type React from "react"
import "./globals.css"
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cursive",
})

export const metadata = {
  title: "La Crème Glacée | Premium Handcrafted Ice Cream",
  description: "Experience the finest artisanal ice cream made with premium ingredients and traditional methods.",
  generator: "v0.dev",
  icons: {
    icon: '/ICLogo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} ${greatVibes.variable} font-sans bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import "./globals.css"


import './globals.css'