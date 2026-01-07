import Navigation from '@/components/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ToursSection from '@/components/sections/ToursSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'
import WhatsAppFAB from '@/components/WhatsAppFAB'

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ToursSection />
      <ContactSection />
      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
