import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function checkAuth(request: NextRequest): boolean {
  const auth = request.headers.get('authorization')
  const password = process.env.ADMIN_PASSWORD || 'zayidan-admin-2024'
  return auth === `Bearer ${password}`
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const items = await db.cmsContent.findMany({ orderBy: { category: 'asc' } })
    const backup = { exportedAt: new Date().toISOString(), version: 1, items }
    return NextResponse.json(backup)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await request.json()
    const items: { key: string; value: string; category?: string }[] = body.items || body
    if (!Array.isArray(items)) return NextResponse.json({ error: 'items array required' }, { status: 400 })
    await db.cmsContent.deleteMany({})
    for (const item of items) {
      await db.cmsContent.upsert({
        where: { key: item.key },
        update: { value: item.value, category: item.category || 'general' },
        create: { key: item.key, value: item.value, category: item.category || 'general' },
      })
    }
    return NextResponse.json({ success: true, imported: items.length })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}