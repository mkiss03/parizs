'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Award, Users, Star, MapPin } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

interface AboutSectionProps {
  title?: string
  description?: string
  image?: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Users,
  Star,
  MapPin,
}

export default function AboutSection({
  title = 'Rólam',
  description = 'Üdvözlöm! Viktória vagyok, licencelt párizsi idegenvezetője és a francia kultúra szenvedélyes rajongója. Több mint 10 éve élek Párizsban, és szeretném megosztani veletek a város rejtett kincseit.',
  image = '/images/viktoria.jpg',
}: AboutSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const imageRotate = useTransform(scrollYProgress, [0, 1], [5, -5])

  const highlights = [
    {
      icon: 'Award',
      title: 'Licencelt idegenvezetés',
      description: 'Hivatalos francia idegenvezetői engedéllyel',
    },
    {
      icon: 'Users',
      title: '500+ elégedett vendég',
      description: 'Évente több száz látogatót kalauzolok',
    },
    {
      icon: 'Star',
      title: '10+ év tapasztalat',
      description: 'Párizsban élek és dolgozom',
    },
    {
      icon: 'MapPin',
      title: 'Helyi tudás',
      description: 'Ismerem a rejtett kincseket',
    },
  ]

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white to-parisian-cream-50 py-20 md:py-32"
    >
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
          {/* Image with Float Effect */}
          <motion.div
            style={{ y: imageY, rotate: imageRotate }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl"
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
              {/* Decorative Frame */}
              <div className="absolute inset-0 rounded-3xl border-4 border-parisian-beige-300 opacity-50" />
            </motion.div>

            {/* Floating Decorative Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-parisian-beige-300 opacity-20 blur-2xl"
            />
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-parisian-beige-400 opacity-20 blur-2xl"
            />
          </motion.div>

          {/* Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-6 font-playfair text-4xl font-bold text-parisian-grey-800 md:text-5xl lg:text-6xl"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8 text-lg leading-relaxed text-parisian-grey-600 md:text-xl"
            >
              {description}
            </motion.p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => {
                const Icon = iconMap[item.icon] || Star
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="rounded-2xl border-2 border-parisian-beige-200 bg-white/60 p-4 backdrop-blur-sm transition-all duration-300 hover:border-parisian-beige-300 hover:bg-white"
                  >
                    <Icon className="mb-2 h-8 w-8 text-parisian-beige-500" />
                    <h4 className="mb-1 font-montserrat text-sm font-semibold text-parisian-grey-800">
                      {item.title}
                    </h4>
                    <p className="text-xs text-parisian-grey-600">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
