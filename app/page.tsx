import { createClient } from '@/lib/supabase/server'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ToursSection from '@/components/sections/ToursSection'
import BundlesSection from '@/components/sections/BundlesSection'
import DiscoverSection from '@/components/sections/DiscoverSection'
import BlogSection from '@/components/sections/BlogSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'
import WhatsAppFAB from '@/components/WhatsAppFAB'
import type { Tour, Profile, Post, DiscoverItem, Bundle } from '@/lib/types/database'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const supabase = await createClient()

  // Fetch data from Supabase
  const { data: profile } = await supabase.from('profile').select('*').single()
  const { data: tours } = await supabase
    .from('tours')
    .select('*')
    .order('display_order')

  // Fetch latest 3 published blog posts
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(3)

  // Fetch discover items (first 6 for homepage)
  const { data: discoverItems } = await supabase
    .from('discover_items')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(6)

  // Fetch published bundles (first 6 for homepage)
  const { data: bundles } = await supabase
    .from('bundles')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(6)

  const profileData = profile as Profile | null
  const toursData = (tours as Tour[]) || []
  const postsData = (posts as Post[]) || []
  const discoverData = (discoverItems as DiscoverItem[]) || []
  const bundlesData = (bundles as Bundle[]) || []

  return (
    <main className="relative">
      <Navigation />
      <HeroSection
        headline={profileData?.hero_title}
        subheadline={profileData?.hero_subtitle}
        ctaText={profileData?.hero_cta_text}
        backgroundImage={profileData?.hero_background_image}
      />
      <AboutSection
        title={profileData?.about_title}
        description={profileData?.about_description}
        image={profileData?.about_image}
      />
      <ToursSection tours={toursData} />
      <BundlesSection bundles={bundlesData} />
      <DiscoverSection items={discoverData} />
      <BlogSection posts={postsData} />
      <ContactSection
        email={profileData?.contact_email}
        phone={profileData?.contact_phone}
      />
      <NewsletterSection />
      <Footer />
      <WhatsAppFAB phoneNumber={profileData?.contact_whatsapp} />
    </main>
  )
}
