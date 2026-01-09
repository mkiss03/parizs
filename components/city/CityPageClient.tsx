'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  Clock,
  CheckCircle,
  MapPin,
  Layers,
  Lock,
  ArrowRight,
  Calendar
} from 'lucide-react'
import type { Bundle, CityPricing } from '@/lib/types/database'

interface CityPageClientProps {
  cityPricing: CityPricing
  bundles: Bundle[]
  hasAccess: boolean
}

export default function CityPageClient({
  cityPricing,
  bundles,
  hasAccess,
}: CityPageClientProps) {
  const totalCards = bundles.reduce((sum, bundle) => sum + (bundle.total_cards || 0), 0)

  const currencySymbol = cityPricing.currency === 'EUR' ? '€'
    : cityPricing.currency === 'USD' ? '$'
    : cityPricing.currency === 'GBP' ? '£'
    : cityPricing.currency === 'HUF' ? 'Ft'
    : cityPricing.currency

  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-french-blue-100 px-4 py-2 text-sm font-semibold text-french-blue-600">
            <MapPin className="mr-1 inline h-4 w-4" />
            {cityPricing.city} City Pass
          </div>

          <h1 className="mb-6 font-playfair text-5xl font-bold text-french-blue-500 md:text-6xl">
            Master {cityPricing.city} with<br />Full City Access
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600">
            {cityPricing.description || `Get unlimited access to all ${cityPricing.city} flashcard bundles for ${cityPricing.duration_days} days. Learn at your own pace with our interactive content.`}
          </p>
        </div>

        {/* Pricing Card - Prominent */}
        <div className="mx-auto mb-16 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border-2 border-french-blue-200 bg-white shadow-2xl">
            <div className="bg-gradient-to-r from-french-blue-500 to-french-blue-600 p-8 text-center text-white">
              <div className="mb-2 text-sm font-semibold uppercase tracking-wide opacity-90">
                Limited Time Offer
              </div>
              <div className="mb-4 font-playfair text-6xl font-bold">
                {currencySymbol}{cityPricing.price.toFixed(2)}
              </div>
              <div className="flex items-center justify-center gap-2 text-lg">
                <Calendar className="h-5 w-5" />
                {cityPricing.duration_days} Days Full Access
              </div>
            </div>

            <div className="p-8">
              {/* What's Included */}
              <h3 className="mb-6 text-center text-xl font-bold text-slate-800">
                What&apos;s Included
              </h3>

              <div className="mb-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <div>
                    <div className="font-semibold text-slate-800">
                      {bundles.length} Premium Bundles
                    </div>
                    <div className="text-sm text-slate-600">
                      Access all flashcard collections
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <div>
                    <div className="font-semibold text-slate-800">
                      {totalCards}+ Interactive Flashcards
                    </div>
                    <div className="text-sm text-slate-600">
                      3D flip animations, hints, and more
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <div>
                    <div className="font-semibold text-slate-800">
                      {cityPricing.duration_days} Days Unlimited Access
                    </div>
                    <div className="text-sm text-slate-600">
                      Study anytime, anywhere
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <div>
                    <div className="font-semibold text-slate-800">
                      Expert-Curated Content
                    </div>
                    <div className="text-sm text-slate-600">
                      Created by local guides and experts
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              {!hasAccess ? (
                <Link
                  href={`/checkout?city=${cityPricing.city}`}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-french-red-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-french-red-600 hover:shadow-xl"
                >
                  <Sparkles className="h-5 w-5" />
                  Unlock {cityPricing.city} Pass Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <div className="rounded-xl bg-green-50 p-6 text-center">
                  <CheckCircle className="mx-auto mb-2 h-12 w-12 text-green-500" />
                  <div className="font-semibold text-green-700">
                    You already have access to {cityPricing.city}!
                  </div>
                  <Link
                    href="/my-passes"
                    className="mt-4 inline-block text-sm font-medium text-green-600 hover:text-green-700"
                  >
                    View My Passes →
                  </Link>
                </div>
              )}

              <p className="mt-4 text-center text-xs text-slate-500">
                🔒 Secure payment • ⚡ Instant access • 💯 Money-back guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Included Bundles */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-playfair text-3xl font-bold text-french-blue-500">
              All {bundles.length} Bundles Included
            </h2>
            <p className="text-slate-600">
              Everything you need to master {cityPricing.city}
            </p>
          </div>

          {bundles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} hasAccess={hasAccess} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <Layers className="mx-auto mb-4 h-12 w-12 text-slate-300" />
              <p className="text-slate-500">
                No bundles available for this city yet. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        {!hasAccess && bundles.length > 0 && (
          <div className="rounded-2xl bg-gradient-to-r from-french-blue-500 to-french-blue-600 p-12 text-center text-white">
            <h3 className="mb-4 font-playfair text-3xl font-bold">
              Ready to Start Learning?
            </h3>
            <p className="mb-6 text-lg opacity-90">
              Get instant access to all {bundles.length} bundles for just {currencySymbol}{cityPricing.price.toFixed(2)}
            </p>
            <Link
              href={`/checkout?city=${cityPricing.city}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-french-blue-500 shadow-lg transition-all hover:shadow-xl"
            >
              <Sparkles className="h-5 w-5" />
              Unlock Now
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function BundleCard({ bundle, hasAccess }: { bundle: Bundle; hasAccess: boolean }) {
  return (
    <Link href={`/bundles/${bundle.slug}`}>
      <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all hover:shadow-xl">
        {/* Cover Image */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <Image
            src={bundle.cover_image || '/images/bundle-fallback.jpg'}
            alt={bundle.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {!hasAccess && (
            <div className="absolute right-2 top-2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <Lock className="mr-1 inline h-3 w-3" />
              Locked
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="mb-2 font-playfair text-lg font-bold text-french-blue-500 transition-colors group-hover:text-french-red-500">
            {bundle.title}
          </h3>

          {bundle.short_description && (
            <p className="mb-3 line-clamp-2 text-sm text-slate-600">
              {bundle.short_description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
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
        </div>
      </div>
    </Link>
  )
}
