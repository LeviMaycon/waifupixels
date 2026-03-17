import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl
    const type = searchParams.get('type')
    const category = searchParams.get('category')

    if (!type || !category) {
        return NextResponse.json({ error: 'Parâmetros ausentes' }, { status: 400 })
    }

    const res = await fetch(`${process.env.WAIFU_API}${type}/${category}`);
    
    if (!res.ok) {
        return NextResponse.json({ error: 'Erro na API externa' }, { status: res.status });
    }
    
    const res_nekos = await fetch(`${process.env.NEKOS_API}`);
    
    if (!res_nekos) {
        return NextResponse.json({ error: 'Erro na API externa' }, { status: res.status });
    }

    const data = await res.json()
    const data_res = await res_nekos.json()

    return NextResponse.json({ image: data.url, image2: data_res.url });
}