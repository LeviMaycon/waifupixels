'use client'

import { use, useEffect, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import ImageCard from '@/src/components/ui/Card'
import ImageModal from '@/src/components/ui/ImageModal'
import SideBar from '@/src/components/SideBar'
import ImageCardSkeleton from '@/src/components/ui/ImageCardSkeleton'
import Pagination from '@/src/components/ui/Pagination'

interface ResultItem {
    url: string
    anime_name?: string
    artist_name?: string
}

const ITEMS_PER_PAGE = 20

export default function NekosBestPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const currentPage = Number(searchParams.get('page')) || 1

    const [allImages, setAllImages] = useState<ResultItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    useEffect(() => {
        async function load() {
            setLoading(true)
            setAllImages([])
            setError(null)
            try {
                const res = await fetch(`/api/nekosbest?category=${category}&amount=20`)
                const data = await res.json()
                setAllImages(data.results || [])
            } catch {
                setError('Erro ao carregar imagens')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [category])

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedImages = allImages.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    const totalPages = Math.ceil(allImages.length / ITEMS_PER_PAGE)

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    if (error) return <div className="p-8 text-red-600">{error}</div>

    return (
        <div className="flex min-h-screen">
            <SideBar />
            <main className="p-6 px-8 mt-16 sm:mt-0 sm:ml-72 min-h-screen">
                <h1 className="text-3xl text-white font-bold mb-8 text-center capitalize">
                    {category}
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {loading
                        ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                            <ImageCardSkeleton key={i} />
                        ))
                        : allImages.length === 0
                            ? <p className="col-span-full text-center text-white/40 text-sm tracking-widest uppercase py-20">Nenhuma imagem encontrada</p>
                            : paginatedImages.map((img, idx) => (
                                <ImageCard
                                    key={idx}
                                    url={img.url}
                                    onClick={() => setSelectedImage(img.url)}
                                />
                            ))
                    }
                </div>

                {!loading && allImages.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                    />
                )}

                {selectedImage && (
                    <ImageModal url={selectedImage} onClose={() => setSelectedImage(null)} />
                )}
            </main>
        </div>
    )
}