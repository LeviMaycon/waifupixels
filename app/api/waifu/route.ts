import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;

    const type = searchParams.get('type');
    const category = searchParams.get('category') || undefined;
    const many = searchParams.get('many') === 'true';

    const rating = searchParams.get('rating')?.split(',') || [];
    const tags = searchParams.get('tags')?.split(',') || [];
    const without_tags = searchParams.get('without_tags')?.split(',') || [];
    const artist = searchParams.get('artist')?.split(',').map(a => parseInt(a, 200)) || [];
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 200) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 200) : undefined;

    const params = new URLSearchParams();
    if (category) params.append('category', category);
    rating.forEach(r => params.append('rating', r));
    tags.forEach(t => params.append('tags', t));
    without_tags.forEach(t => params.append('without_tags', t));
    artist.forEach(a => params.append('artist', a.toString()));
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());

    try {
        if (many) {
            const res = await fetch(
                `${process.env.WAIFU_API}many/${type}${category ? `/${category}` : ''}`,
                { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) }
            );

            if (!res.ok) {
                return NextResponse.json({ error: 'Erro na API WAIFU' }, { status: res.status });
            }

            const data = await res.json();
            return NextResponse.json({ images: data.files });
        }

        const resWaifu = await fetch(`${process.env.WAIFU_API}${type}${category ? `/${category}` : ''}`);

        if (!resWaifu.ok) {
            return NextResponse.json({ error: 'Erro na API WAIFU' }, { status: resWaifu.status });
        }

        const dataWaifu = await resWaifu.json();
        return NextResponse.json({ image1: dataWaifu.url });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}