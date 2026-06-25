import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'

function checkAuth(request: NextRequest): boolean {
  const auth = request.headers.get('authorization')
  const password = process.env.ADMIN_PASSWORD || 'zayidan-admin-2024'
  return auth === `Bearer ${password}`
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const totalVisitors = await db.visitorSession.count()
    const totalPageViews = await db.pageView.count()
    const contactCount = await db.contactSubmission.count()

    const sectionViews = await db.pageView.groupBy({
      by: ['section'],
      _count: { section: true },
      orderBy: { _count: { section: 'desc' } },
    })

    const recentVisitors = await db.visitorSession.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { pageViews: { select: { section: true, createdAt: true } } },
    })

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const dailyTrend = await db.$queryRaw<{ date: string; count: number }[]>`
      SELECT DATE(createdAt) as date, COUNT(DISTINCT sessionId) as count
      FROM VisitorSession
      WHERE createdAt >= ${sevenDaysAgo.toISOString()}
      GROUP BY DATE(createdAt)
      ORDER BY date ASC
    `

    const avgSections = totalVisitors > 0 ? Math.round((totalPageViews / totalVisitors) * 10) / 10 : 0

    return NextResponse.json({
      success: true,
      data: { totalVisitors, totalPageViews, contactCount, sectionViews: sectionViews.map(s => ({ section: s.section, views: s._count.section })), recentVisitors, dailyTrend, avgSections },
    })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}