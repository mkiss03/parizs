'use client'

import Link from 'next/link'
import {
  MapPin,
  Calendar,
  Package,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Globe
} from 'lucide-react'
import type { CityPricing } from '@/lib/types/database'

interface PricingClientProps {
  cities: (CityPricing & { bundleCount: number })[]
}

export default function PricingClient({ cities }: PricingClientProps) {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-french-blue-100 px-4 py-2 text-sm font-semibold text-french-blue-600">
            <Globe className="mr-1 inline h-4 w-4" />
            Choose Your City
          </div>

          <h1 className="mb-6 font-playfair text-5xl font-bold text-french-blue-500 md:text-6xl">
            Unlock Your Perfect<br />City Experience
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Get time-limited access to all premium flashcard bundles for your chosen city.
            Learn at your own pace with interactive content curated by local experts.
          </p>
        </div>

        {/* Pricing Cards */}
        {cities.length > 0 ? (
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <CityPricingCard key={city.city} city={city} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <Globe className="mx-auto mb-4 h-12 w-12 text-slate-300" />
            <h3 className="mb-2 font-semibold text-slate-600">No Cities Available</h3>
            <p className="text-sm text-slate-500">
              Check back soon for new city passes!
            </p>
          </div>
        )}

        {/* Features Section */}
        <div className="mx-auto mt-24 max-w-4xl">
          <h2 className="mb-12 text-center font-playfair text-3xl font-bold text-french-blue-500">
            What You Get with Every Pass
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-800">Full Content Access</h3>
                <p className="text-sm text-slate-600">
                  Unlock all flashcard bundles for your chosen city. No hidden fees or limitations.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Sparkles className="h-6 w-6 text-french-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-800">Interactive Learning</h3>
                <p className="text-sm text-slate-600">
                  3D flip animations, hints, progress tracking, and more engaging features.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-800">Time-Limited Access</h3>
                <p className="text-sm text-slate-600">
                  7 days of unlimited access. Study at your own pace, anytime, anywhere.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <Package className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-800">Expert Curation</h3>
                <p className="text-sm text-slate-600">
                  Content created by local guides, language experts, and cultural specialists.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ or CTA */}
        <div className="mx-auto mt-24 max-w-2xl text-center">
          <div className="rounded-2xl border-2 border-french-blue-200 bg-white p-8 shadow-lg">
            <h3 className="mb-4 font-playfair text-2xl font-bold text-french-blue-500">
              Not Sure Which City to Choose?
            </h3>
            <p className="mb-6 text-slate-600">
              Explore our city pages to see what&apos;s included in each pass before you buy.
            </p>
            <Link
              href="/#bundles"
              className="inline-flex items-center gap-2 rounded-full bg-french-blue-500 px-6 py-3 font-semibold text-white transition-all hover:bg-french-blue-600"
            >
              Browse All Content
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function CityPricingCard({ city }: { city: CityPricing & { bundleCount: number } }) {
  const currencySymbol =
    city.currency === 'EUR' ? '€'
    : city.currency === 'USD' ? '$'
    : city.currency === 'GBP' ? '£'
    : city.currency === 'HUF' ? 'Ft'
    : city.currency

  // Determine if this is a "featured" card (could be based on popularity, etc.)
  const isFeatured = city.city === 'Paris' // Example: Make Paris featured

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border-2 bg-white shadow-lg transition-all hover:shadow-2xl ${
        isFeatured ? 'border-french-red-300' : 'border-slate-200'
      }`}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-french-red-500 px-3 py-1 text-xs font-bold text-white">
          POPULAR
        </div>
      )}

      {/* Header */}
      <div
        className={`p-8 text-white ${
          isFeatured
            ? 'bg-gradient-to-r from-french-red-500 to-french-red-600'
            : 'bg-gradient-to-r from-french-blue-500 to-french-blue-600'
        }`}
      >
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide opacity-90">
          <MapPin className="h-4 w-4" />
          City Pass
        </div>
        <h3 className="mb-4 font-playfair text-3xl font-bold">{city.city}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold">{currencySymbol}{city.price.toFixed(0)}</span>
          <span className="text-lg opacity-90">/{city.duration_days} days</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* What's Included */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="text-sm text-slate-700">
              <strong>{city.bundleCount}</strong> premium bundles
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="text-sm text-slate-700">
              <strong>{city.duration_days} days</strong> full access
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="text-sm text-slate-700">
              All content categories
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="text-sm text-slate-700">
              Interactive flashcards
            </span>
          </div>
        </div>

        {/* Description */}
        {city.description && (
          <p className="mb-6 text-sm text-slate-600">
            {city.description}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link
            href={`/city/${city.city.toLowerCase()}`}
            className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-all ${
              isFeatured
                ? 'bg-french-red-500 hover:bg-french-red-600'
                : 'bg-french-blue-500 hover:bg-french-blue-600'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href={`/checkout?city=${city.city}`}
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-50"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  )
}
