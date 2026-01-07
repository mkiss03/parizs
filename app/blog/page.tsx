import { createClient } from '@/lib/supabase/server'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import type { Post } from '@/lib/types/database'

export const revalidate = 60

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  const postsData = (posts as Post[]) || []

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-champagne-100 to-champagne-200">
        {/* Hero */}
        <div className="bg-navy-500 py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 font-playfair text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              Párizsi Napló
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-champagne-100">
              Történetek, élmények és titkos helyek a Fények Városából
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="container mx-auto px-4 py-16">
          {postsData.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
              <h2 className="font-playfair text-2xl font-bold text-navy-500">
                Hamarosan...
              </h2>
              <p className="mt-2 text-navy-400">
                Dolgozunk az első bejegyzéseken!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {postsData.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="glass-strong group overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    {/* Cover Image */}
                    {post.cover_image && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.cover_image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-500/50 to-transparent" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {/* Date */}
                      <div className="mb-3 flex items-center gap-2 text-sm text-navy-400">
                        <Calendar className="h-4 w-4 text-gold-400" />
                        <span>
                          {formatDate(post.published_at || post.created_at)}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="mb-3 font-playfair text-2xl font-bold text-navy-500 transition-colors group-hover:text-gold-500">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="line-clamp-3 text-navy-400">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
