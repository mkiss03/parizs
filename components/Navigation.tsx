'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.98)']
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Kezdőlap', href: '#' },
    { name: 'Rólam', href: '#about' },
    { name: 'Túrák', href: '#tours' },
    { name: 'Felfedezés', href: '/discover' },
    { name: 'Blog', href: '/blog' },
    { name: 'Kapcsolat', href: '#contact' },
  ]

  return (
    <>
      <motion.nav
        style={{ backgroundColor }}
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'shadow-lg backdrop-blur-md' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="font-playfair text-2xl font-bold text-french-blue-500 md:text-3xl"
            >
              Viktória <span className="text-french-red-500">Paris</span>
            </motion.a>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden items-center gap-8 md:flex"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative font-montserrat font-medium text-french-blue-500 transition-colors hover:text-french-red-500"
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 w-0 bg-french-red-500 transition-all duration-300 hover:w-full"
                    whileHover={{ width: '100%' }}
                  />
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-french-red-500 px-6 py-2 font-semibold text-white transition-all duration-300 hover:bg-french-red-600"
              >
                Foglalás
              </motion.a>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-8 w-8 text-french-blue-500" />
              ) : (
                <Menu className="h-8 w-8 text-french-blue-500" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{
          opacity: isOpen ? 1 : 0,
          x: isOpen ? 0 : '100%',
        }}
        transition={{ duration: 0.3 }}
        className={`fixed right-0 top-20 z-30 h-screen w-full bg-white/98 backdrop-blur-lg shadow-xl md:hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8 p-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                x: isOpen ? 0 : 50,
              }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-semibold text-french-blue-500"
            >
              {item.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              scale: isOpen ? 1 : 0.8,
            }}
            transition={{ duration: 0.3, delay: 0.4 }}
            onClick={() => setIsOpen(false)}
            className="rounded-full bg-french-red-500 px-8 py-3 text-xl font-semibold text-white"
          >
            Foglalás
          </motion.a>
        </div>
      </motion.div>
    </>
  )
}
