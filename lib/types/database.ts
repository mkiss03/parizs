export interface Profile {
  id: string
  hero_title: string
  hero_subtitle: string
  hero_cta_text: string
  hero_background_image?: string
  about_title: string
  about_description: string
  about_image?: string
  contact_email: string
  contact_phone: string
  contact_whatsapp: string
  created_at: string
  updated_at: string
}

export interface Tour {
  id: string
  title: string
  slug: string
  short_description?: string
  full_description?: string
  image_url?: string
  price: number
  duration: number
  max_group_size: number
  features?: string[]
  is_featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  image_url: string
  caption?: string
  alt_text?: string
  display_order: number
  created_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  cover_image?: string
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface DiscoverItem {
  id: string
  title: string
  description?: string
  image_url?: string
  link_url?: string
  category?: string
  sort_order: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Subscriber {
  id: string
  email: string
  subscribed_at: string
  is_active: boolean
  unsubscribed_at?: string
  created_at: string
}
