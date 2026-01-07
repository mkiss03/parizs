'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function AdminHeader() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="border-b border-champagne-300 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <h1 className="font-playfair text-2xl font-bold text-navy-500">
            Párizs Túrák <span className="text-gold-400">Admin</span>
          </h1>
        </div>
        <Button onClick={handleLogout} variant="ghost" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Kijelentkezés
        </Button>
      </div>
    </header>
  )
}
