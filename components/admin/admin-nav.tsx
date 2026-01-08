'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MapPin, FileText, Image, PenTool, Compass, Mail } from 'lucide-react'

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
    title: 'Párizs Ismertető',
    href: '/admin/discover',
    icon: Compass,
  },
  {
    title: 'Blog',
    href: '/admin/blog',
    icon: PenTool,
  },
  {
    title: 'Feliratkozók',
    href: '/admin/subscribers',
    icon: Mail,
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
    <nav className="w-64 border-r border-slate-200 bg-white p-4">
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
                    ? 'bg-french-blue-500 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
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
