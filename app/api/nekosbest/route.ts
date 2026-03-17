import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl
    const category = searchParams.get('category') || 'hug'
    const amount = searchParams.get('amount') || '200'

    try {
        const res = await fetch(`${process.env.NEKOS_BEST_API}/${category}?amount=${amount}`, {
            headers: { 'User-Agent': 'WaifuPixels/1.0 (https://github.com/LeviMaycon/waifupixels)' }
        })

        if (!res.ok) return NextResponse.json({ error: 'Erro na API' }, { status: res.status })

        const data = await res.json()
        return NextResponse.json({ results: data.results })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}