'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Trash2, Mail, Download, Search, CheckCircle, XCircle } from 'lucide-react'
import type { Subscriber } from '@/lib/types/database'
import { useState } from 'react'

export default function SubscribersPage() {
  const supabase = createClient()
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')

  const { data: subscribers, isLoading } = useQuery({
    queryKey: ['subscribers'],
    queryFn: async () => {
      const { data } = await supabase
        .from('subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false })
      return data as Subscriber[]
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('subscribers')
        .delete()
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] })
    },
  })

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const updateData: { is_active: boolean; unsubscribed_at?: string | null } = { is_active }
      if (!is_active) {
        updateData.unsubscribed_at = new Date().toISOString()
      } else {
        updateData.unsubscribed_at = null
      }

      const { error } = await supabase
        .from('subscribers')
        .update(updateData)
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] })
    },
  })

  const filteredSubscribers = subscribers?.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleExportCSV = () => {
    if (!subscribers || subscribers.length === 0) return

    const csvContent = [
      ['Email', 'Subscribed At', 'Status'],
      ...subscribers.map(sub => [
        sub.email,
        new Date(sub.subscribed_at).toLocaleString('hu-HU'),
        sub.is_active ? 'Aktív' : 'Inaktív',
      ]),
    ]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `subscribers_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
      </div>
    )
  }

  const activeCount = subscribers?.filter(s => s.is_active).length || 0
  const inactiveCount = (subscribers?.length || 0) - activeCount

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-french-blue-500">
            Feliratkozók
          </h1>
          <p className="mt-2 text-slate-600">
            Összes feliratkozó: <strong>{subscribers?.length || 0}</strong> (
            <span className="text-green-600">{activeCount} aktív</span>,{' '}
            <span className="text-slate-400">{inactiveCount} inaktív</span>)
          </p>
        </div>
        <Button
          onClick={handleExportCSV}
          disabled={!subscribers || subscribers.length === 0}
          className="bg-french-blue-500 hover:bg-french-blue-600"
        >
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Keresés email cím alapján..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Subscribers List */}
      {filteredSubscribers && filteredSubscribers.length > 0 ? (
        <div className="space-y-2">
          {filteredSubscribers.map((subscriber) => (
            <Card
              key={subscriber.id}
              className={`overflow-hidden border-slate-200 transition-all hover:shadow-md ${
                !subscriber.is_active ? 'opacity-60' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Status Icon */}
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        subscriber.is_active
                          ? 'bg-green-100 text-green-600'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Mail className="h-5 w-5" />
                    </div>

                    {/* Email & Date */}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-french-blue-500">
                          {subscriber.email}
                        </p>
                        {subscriber.is_active ? (
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            Aktív
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <XCircle className="h-3 w-3" />
                            Leiratkozott
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500">
                        Feliratkozott: {formatDate(subscriber.subscribed_at)}
                      </p>
                      {!subscriber.is_active && subscriber.unsubscribed_at && (
                        <p className="text-xs text-slate-400">
                          Leiratkozott: {formatDate(subscriber.unsubscribed_at)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={subscriber.is_active ? 'outline' : 'default'}
                      onClick={() =>
                        toggleActiveMutation.mutate({
                          id: subscriber.id,
                          is_active: !subscriber.is_active,
                        })
                      }
                      disabled={toggleActiveMutation.isPending}
                    >
                      {subscriber.is_active ? (
                        <>
                          <XCircle className="mr-2 h-4 w-4" />
                          Deaktiválás
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Aktiválás
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        if (
                          confirm(
                            `Biztosan törli ezt a feliratkozót?\n${subscriber.email}`
                          )
                        ) {
                          deleteMutation.mutate(subscriber.id)
                        }
                      }}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : subscribers && subscribers.length > 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 font-semibold text-slate-500">
              Nincs találat
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Próbáljon másik keresési kifejezést
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Mail className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 font-semibold text-slate-500">
              Még nincs feliratkozó
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              A feliratkozók itt jelennek majd meg
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
