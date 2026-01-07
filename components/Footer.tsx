'use client'

import { motion } from 'framer-motion'
import { Facebook, Instagram, Linkedin, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="relative overflow-hidden bg-navy-500 py-12 text-white">
      {/* Background Decoration */}
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gold-400 opacity-5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 font-playfair text-3xl font-bold">
              Viktória <span className="text-gold-400">Paris</span>
            </h3>
            <p className="text-champagne-200">
              Fedezze fel Párizs varázslatos titkait egy tapasztalt magyar idegenvezetővel.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 font-playfair text-xl font-semibold">Gyors Linkek</h4>
            <ul className="space-y-2">
              {['Kezdőlap', 'Rólam', 'Túrák', 'Kapcsolat'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-champagne-200 transition-colors hover:text-gold-400"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 font-playfair text-xl font-semibold">Kövess minket</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne-300/10 backdrop-blur-sm transition-all hover:bg-gold-400"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 border-t border-champagne-300/20 pt-8 text-center"
        >
          <p className="flex items-center justify-center gap-2 text-champagne-200">
            © {currentYear} Viktória Szeidl. Made with{' '}
            <Heart className="h-4 w-4 fill-burgundy-500 text-burgundy-500" /> in Paris
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
