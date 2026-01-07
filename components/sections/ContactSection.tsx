'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useState } from 'react'

interface ContactSectionProps {
  email?: string
  phone?: string
  whatsapp?: string
}

export default function ContactSection({
  email = 'viktoria@parizstourist.com',
  phone = '+33 6 12 34 56 78',
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission (integrate with your backend)
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: Phone,
      label: 'Telefon',
      value: phone,
      href: `tel:${phone}`,
    },
    {
      icon: MapPin,
      label: 'Helyszín',
      value: 'Párizs, Franciaország',
      href: '#',
    },
  ]

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-champagne-100 to-champagne-300 py-20 md:py-32">
      {/* Background Decoration */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400 opacity-5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-playfair text-4xl font-bold text-navy-500 md:text-5xl lg:text-6xl">
            Lépjen kapcsolatba
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-navy-400 md:text-xl">
            Készen áll felfedezni Párizst? Vegye fel velem a kapcsolatot, és tervezzük meg együtt az Ön álomtúráját!
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 font-playfair text-3xl font-bold text-navy-500">
              Elérhetőségek
            </h3>

            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="glass flex items-center gap-4 rounded-2xl p-6 transition-all duration-300 hover:glass-strong"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400">
                      <Icon className="h-7 w-7 text-navy-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-400">{item.label}</p>
                      <p className="text-lg font-bold text-navy-500">{item.value}</p>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Decorative Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 rounded-3xl border-l-4 border-gold-400 bg-white/50 p-6 backdrop-blur-sm"
            >
              <p className="italic text-navy-400">
                &ldquo;Párizs mindig jó ötlet. Különösen akkor, ha egy tapasztalt idegenvezetővel fedezi fel.&rdquo;
              </p>
              <p className="mt-2 font-semibold text-navy-500">- Viktória</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8">
              <h3 className="mb-6 font-playfair text-2xl font-bold text-navy-500">
                Küldjön üzenetet
              </h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-navy-500">
                    Név
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border-2 border-champagne-400 bg-white/50 px-4 py-3 backdrop-blur-sm transition-all duration-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-navy-500">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border-2 border-champagne-400 bg-white/50 px-4 py-3 backdrop-blur-sm transition-all duration-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-navy-500">
                    Üzenet
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-xl border-2 border-champagne-400 bg-white/50 px-4 py-3 backdrop-blur-sm transition-all duration-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-navy-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-navy-600"
                >
                  Üzenet küldése
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
