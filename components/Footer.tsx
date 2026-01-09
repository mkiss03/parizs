'use client'

import { motion } from 'framer-motion'
import { Facebook, Heart, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-parisian-grey-800 py-12 text-white">
      {/* Background Decoration */}
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-parisian-beige-400 opacity-10 blur-3xl" />

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
              Viktória <span className="text-parisian-beige-400">Paris</span>
            </h3>
            <p className="text-white/80">
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
              <motion.li whileHover={{ x: 5 }}>
                <a href="/#" className="text-white/80 transition-colors hover:text-white">
                  Kezdőlap
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/#about" className="text-white/80 transition-colors hover:text-white">
                  Rólam
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/#tours" className="text-white/80 transition-colors hover:text-white">
                  Túrák
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/discover" className="text-white/80 transition-colors hover:text-white">
                  Felfedezés
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/blog" className="text-white/80 transition-colors hover:text-white">
                  Blog
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/#contact" className="text-white/80 transition-colors hover:text-white">
                  Kapcsolat
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 font-playfair text-xl font-semibold">Kapcsolat</h4>

            {/* Contact Info */}
            <div className="mb-6 space-y-3">
              <a
                href="tel:+33612345678"
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5" />
                <span>+33 6 12 34 56 78</span>
              </a>
              <a
                href="mailto:viktoria@parizstourist.com"
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5" />
                <span>viktoria@parizstourist.com</span>
              </a>
            </div>

            {/* Facebook */}
            <div className="flex gap-4">
              <motion.a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-parisian-beige-400"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 border-t border-white/20 pt-8 text-center"
        >
          <p className="flex items-center justify-center gap-2 text-white/80">
            © {currentYear} Viktória Szeidl. Made with{' '}
            <Heart className="h-4 w-4 fill-parisian-beige-400 text-parisian-beige-400" /> in Paris
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
