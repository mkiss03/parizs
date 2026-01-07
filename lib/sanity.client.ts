import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { sanityConfig } from '@/sanity/config'

export const client = createClient(sanityConfig)

const builder = imageUrlBuilder(client)

/* eslint-disable @typescript-eslint/no-explicit-any */
export function urlFor(source: any) {
  return builder.image(source)
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// Query helpers
export async function getHeroSection() {
  return client.fetch(`*[_type == "hero"][0]`)
}

export async function getAboutSection() {
  return client.fetch(`*[_type == "about"][0]`)
}

export async function getTours() {
  return client.fetch(`*[_type == "tour"] | order(order asc)`)
}

export async function getFeaturedTours() {
  return client.fetch(`*[_type == "tour" && featured == true] | order(order asc)`)
}

export async function getGallery() {
  return client.fetch(`*[_type == "gallery"][0]`)
}

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}
