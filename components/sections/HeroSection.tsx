'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRef } from 'react'

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  backgroundImage?: string
  ctaText?: string
  ctaLink?: string
}

export default function HeroSection({
  headline = 'Fedezze fel Párizs titkait',
  subheadline = 'Személyre szabott túrák a Fények Városában',
  backgroundImage = '/images/paris-hero.jpg',
  ctaText = 'Fedezze fel a túrákat',
  ctaLink = '#tours',
}: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div
          className="h-[120vh] w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 33, 71, 0.3), rgba(0, 33, 71, 0.5)), url(${backgroundImage})`,
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 font-playfair text-5xl font-bold text-white md:text-7xl lg:text-8xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12 max-w-2xl text-xl text-champagne-100 md:text-2xl"
        >
          {subheadline}
        </motion.p>

        <motion.a
          href={ctaLink}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative overflow-hidden rounded-full bg-gold-400 px-8 py-4 font-montserrat text-lg font-semibold text-navy-500 shadow-2xl transition-all duration-300 hover:bg-gold-500"
        >
          <span className="relative z-10">{ctaText}</span>
          <div className="absolute inset-0 -z-0 bg-gradient-to-r from-gold-300 to-gold-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.a>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-10 w-10 text-white opacity-80" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-champagne-300 to-transparent" />
    </section>
  )
}
