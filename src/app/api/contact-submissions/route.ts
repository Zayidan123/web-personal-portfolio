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
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1')
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20')
    const [items, total] = await Promise.all([
      db.contactSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: limit, skip: (page - 1) * limit }),
      db.contactSubmission.count(),
    ])
    return NextResponse.json({ success: true, data: items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}