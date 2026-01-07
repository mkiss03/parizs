'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MapPin, FileText, Image } from 'lucide-react'

const navItems = [
  {
    title: 'Áttekintés',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Túrák kezelése',
    href: '/admin/tours',
    icon: MapPin,
  },
  {
    title: 'Tartalom',
    href: '/admin/content',
    icon: FileText,
  },
  {
    title: 'Képek',
    href: '/admin/gallery',
    icon: Image,
  },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 border-r border-champagne-300 bg-white p-4">
      <ul className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                  isActive
                    ? 'bg-gold-400 text-navy-500 font-semibold'
                    : 'text-navy-400 hover:bg-champagne-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
