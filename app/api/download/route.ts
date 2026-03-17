import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url')
    if (!url) return NextResponse.json({ error: 'URL obrigatória' }, { status: 400 })

    const res = await fetch(url)
    if (!res.ok) return NextResponse.json({ error: 'Erro ao baixar' }, { status: 500 })

    const blob = await res.blob()
    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const filename = url.split('/').pop() || 'image'

    return new NextResponse(blob, {
        headers: {
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${filename}"`,
        },
    })
}