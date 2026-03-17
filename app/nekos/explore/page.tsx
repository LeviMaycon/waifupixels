'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import Pagination from '@/src/components/ui/Pagination'
import ImageCard from '@/src/components/ui/Card'
import ImageModal from '@/src/components/ui/ImageModal'
import SideBar from '@/src/components/SideBar'
import ImageCardSkeleton from '@/src/components/ui/ImageCardSkeleton'

interface ImageData { url: string }

const ITEMS_PER_PAGE = 30

export default function NekosExplorePage() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const currentPage = Number(searchParams.get('page')) || 1

    const [images, setImages] = useState<ImageData[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [tagInput, setTagInput] = useState('')
    const [activeTags, setActiveTags] = useState('')

    async function loadImages(tags: string, page: number) {
        setLoading(true)
        setImages([])
        setError(null)
        try {
            const offset = (page - 1) * ITEMS_PER_PAGE
            const query = tags ? `&tags=${tags}` : ''
            const res = await fetch(`/api/nekos?rating=safe&limit=${ITEMS_PER_PAGE}&offset=${offset}${query}`)
            const data = await res.json()
            setImages((data.images || []).map((url: string) => ({ url })))
            setTotal(data.total || 0)
        } catch (err) {
            setError('Erro ao carregar imagens')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadImages(activeTags, currentPage)
    }, [currentPage])

    const handleSearch = () => {
        setActiveTags(tagInput)
        const params = new URLSearchParams(searchParams)
        params.set('page', '1')
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
        loadImages(tagInput, 1)
    }

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

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
                <h1 className="text-3xl text-white font-bold mb-6 text-center">Explorar Nekos</h1>

                <div className="flex gap-2 mb-8 w-full max-w-xl mx-auto">
                    <input
                        type="text"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                        placeholder="Buscar por tags (ex: catgirl, blue_hair)"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                        <Search size={15} />
                        Buscar
                    </button>
                </div>

                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {loading
                        ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                            <ImageCardSkeleton key={i} />
                        ))
                        : images.length === 0
                            ? <p className="col-span-full text-center text-white/40 text-sm tracking-widest uppercase py-20">Nenhuma imagem encontrada</p>
                            : images.map((img, idx) => (
                                <ImageCard
                                    key={idx}
                                    url={img.url}
                                    onClick={() => setSelectedImage(img.url)}
                                />
                            ))
                    }
                </div>

                {!loading && images.length > 0 && (
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