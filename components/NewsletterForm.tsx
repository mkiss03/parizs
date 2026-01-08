'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Kérjük, adjon meg egy érvényes email címet.')
      return
    }

    setStatus('loading')

    try {
      // Check if email already exists
      const { data: existing } = await supabase
        .from('subscribers')
        .select('id, is_active')
        .eq('email', email)
        .single()

      if (existing) {
        if (existing.is_active) {
          setStatus('error')
          setMessage('Ez az email cím már fel van iratkozva.')
        } else {
          // Reactivate the subscription
          const { error } = await supabase
            .from('subscribers')
            .update({
              is_active: true,
              subscribed_at: new Date().toISOString(),
              unsubscribed_at: null
            })
            .eq('id', existing.id)

          if (error) throw error

          setStatus('success')
          setMessage('Sikeresen újra feliratkozott!')
          setEmail('')
        }
      } else {
        // New subscription
        const { error } = await supabase
          .from('subscribers')
          .insert({ email })

        if (error) throw error

        setStatus('success')
        setMessage('Köszönjük! Sikeresen feliratkozott.')
        setEmail('')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setStatus('error')
      setMessage('Hiba történt. Kérjük, próbálja újra később.')
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 5000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mx-auto max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email cím..."
              disabled={status === 'loading' || status === 'success'}
              className="w-full rounded-full border-2 border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:border-french-blue-500 focus:outline-none focus:ring-2 focus:ring-french-blue-200 disabled:bg-slate-50"
              required
            />
          </div>
          <motion.button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            whileHover={{ scale: status === 'loading' || status === 'success' ? 1 : 1.05 }}
            whileTap={{ scale: status === 'loading' || status === 'success' ? 1 : 0.95 }}
            className="flex items-center justify-center gap-2 rounded-full bg-french-red-500 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-french-red-600 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {status === 'loading' ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Küldés...</span>
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>Feliratkozott!</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Feliratkozás</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Status Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-3 text-center text-sm ${
              status === 'error' ? 'text-french-red-500' : 'text-green-600'
            }`}
          >
            {message}
          </motion.p>
        )}
      </form>

      {/* Privacy Note */}
      <p className="mt-4 text-center text-xs text-slate-500">
        Feliratkozással elfogadja az{' '}
        <a href="/privacy" className="underline hover:text-french-blue-500">
          adatvédelmi nyilatkozatunkat
        </a>
        . Bármikor leiratkozhat.
      </p>
    </motion.div>
  )
}
