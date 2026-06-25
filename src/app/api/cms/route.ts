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
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const where = category ? { category } : {}
    const items = await db.cmsContent.findMany({ where, orderBy: { category: 'asc' } })
    const grouped: Record<string, { key: string; value: string }[]> = {}
    for (const item of items) {
      if (!grouped[item.category]) grouped[item.category] = []
      grouped[item.category].push({ key: item.key, value: item.value })
    }
    return NextResponse.json({ success: true, data: items, grouped })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { key, value, category } = await request.json()
    if (!key || value === undefined) return NextResponse.json({ error: 'key and value required' }, { status: 400 })
    const item = await db.cmsContent.upsert({
      where: { key },
      update: { value, category: category || 'general' },
      create: { key, value, category: category || 'general' },
    })
    return NextResponse.json({ success: true, data: item })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { key } = await request.json()
    if (!key) return NextResponse.json({ error: 'key required' }, { status: 400 })
    await db.cmsContent.delete({ where: { key } })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}