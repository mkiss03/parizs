'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Lock, MapPin, Layers, Clock } from 'lucide-react'
import type { Bundle } from '@/lib/types/database'

interface BundlesSectionProps {
  bundles: Bundle[]
}

export default function BundlesSection({ bundles }: BundlesSectionProps) {
  if (!bundles || bundles.length === 0) return null

  return (
    <section id="bundles" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-playfair text-4xl font-bold text-french-blue-500 md:text-5xl">
            City Guide Flashcards
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Master any city with our interactive flashcard bundles. Learn local phrases, metro routes, cultural tips, and more!
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-french-blue-50 px-6 py-3 text-sm font-semibold text-french-blue-600">
            <Lock className="h-4 w-4" />
            Unlock full city access with a City Pass
          </div>
        </div>

        {/* Bundles Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>

        {/* CTA to Purchase */}
        <div className="mt-16 text-center">
          <Link
            href="/pricing"
            className="inline-block rounded-full bg-french-red-500 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-french-red-600 hover:shadow-xl"
          >
            View City Passes & Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}

function BundleCard({ bundle }: { bundle: Bundle }) {
  // For now, assume user doesn't have access (show lock)
  // TODO: Check user's city passes when auth is implemented
  const hasAccess = false

  return (
    <Link href={`/bundles/${bundle.slug}`}>
      <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl">
        {/* Cover Image with Lock Overlay */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <Image
            src={bundle.cover_image || '/images/bundle-fallback.jpg'}
            alt={bundle.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />

          {/* Lock Overlay */}
          {!hasAccess && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2 text-white">
                <Lock className="h-8 w-8" />
                <span className="text-sm font-semibold">City Pass Required</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="mb-2 font-playfair text-xl font-bold text-french-blue-500 transition-colors group-hover:text-french-red-500">
            {bundle.title}
          </h3>

          {/* Description */}
          {bundle.short_description && (
            <p className="mb-4 line-clamp-2 text-sm text-slate-600">
              {bundle.short_description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {bundle.city}
            </span>
            <span className="flex items-center gap-1">
              <Layers className="h-3.5 w-3.5" />
              {bundle.total_cards || 0} cards
            </span>
            {bundle.estimated_time_minutes && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                ~{bundle.estimated_time_minutes} min
              </span>
            )}
          </div>

          {/* Difficulty Badge */}
          {bundle.difficulty_level && (
            <div className="mt-3">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  bundle.difficulty_level === 'beginner'
                    ? 'bg-green-100 text-green-700'
                    : bundle.difficulty_level === 'intermediate'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {bundle.difficulty_level === 'beginner' && 'Beginner'}
                {bundle.difficulty_level === 'intermediate' && 'Intermediate'}
                {bundle.difficulty_level === 'advanced' && 'Advanced'}
              </span>
            </div>
          )}

          {/* Category */}
          {bundle.category && (
            <div className="mt-2 text-xs font-medium uppercase tracking-wide text-french-blue-400">
              {bundle.category}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
