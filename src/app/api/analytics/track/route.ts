import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, section, duration, ip, userAgent, referrer } = body
    if (!sessionId || !section) return NextResponse.json({ error: 'sessionId and section required' }, { status: 400 })

    const existing = await db.visitorSession.findUnique({ where: { sessionId } })
    if (!existing) {
      await db.visitorSession.create({
        data: { sessionId, ip: ip || request.headers.get('x-forwarded-for') || null, userAgent: userAgent || null, referrer: referrer || null },
      })
    }
    const pageView = await db.pageView.create({
      data: { sessionId, section, duration: duration || 0 },
    })
    return NextResponse.json({ success: true, data: pageView })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}