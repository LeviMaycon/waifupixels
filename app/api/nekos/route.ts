import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl

    const tags = searchParams.get('tags') || ''
    const rating = searchParams.get('rating') || 'safe'
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 200) : 200
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 200) : 0
    const random = searchParams.get('random') === 'true'

    if (random) {
        try {
            const results = await Promise.all(
                Array.from({ length: 5 }, () =>
                    fetch(`${process.env.NEKOS_API}/random`)
                        .then(r => r.json())
                        .catch(() => [])
                )
            )

            const allItems = results.flat()
            const safeItems = allItems.filter((img: any) => img.rating === 'safe' && img.url)
            const item = safeItems.length > 0
                ? safeItems[Math.floor(Math.random() * safeItems.length)]
                : null

            if (!item?.url) return NextResponse.json({ error: 'Nenhuma imagem safe encontrada' }, { status: 404 })
            return NextResponse.json({ url: item.url })
        } catch (err: any) {
            return NextResponse.json({ error: err.message }, { status: 500 })
        }
    }

    const params = new URLSearchParams()
    if (tags) tags.split(',').forEach(t => params.append('tags', t.trim()))
    params.append('rating', rating)
    params.append('limit', limit.toString())
    params.append('offset', offset.toString())

    try {
        const res = await fetch(`${process.env.NEKOS_API}?${params.toString()}`)

        if (!res.ok) {
            return NextResponse.json({ error: 'Erro na API Nekos' }, { status: res.status })
        }

        const data = await res.json()
        const images = (data.items ?? []).map((img: any) => img.url).filter(Boolean)
        return NextResponse.json({ images, total: data.count ?? 0 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}