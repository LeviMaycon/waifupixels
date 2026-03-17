'use client'

import { useEffect, useState } from 'react'
import ImageCard from '@/src/components/ui/Card'
import ImageModal from '@/src/components/ui/ImageModal'
import SideBar from '@/src/components/SideBar'
import ImageCardSkeleton from '@/src/components/ui/ImageCardSkeleton'

interface ImageData { url: string }

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<ImageData[]>([])
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const stored: string[] = JSON.parse(localStorage.getItem('favorites') || '[]')
        setFavorites(stored.map(url => ({ url })))
        setLoading(false)
    }, [])

    const handleRemove = (url: string) => {
        const updated = favorites.filter(f => f.url !== url)
        setFavorites(updated)
        localStorage.setItem('favorites', JSON.stringify(updated.map(f => f.url)))
        if (selectedImage === url) setSelectedImage(null)
    }

    return (
        <div className="flex min-h-screen">
            <SideBar />
            <main className="p-6 px-8 mt-16 sm:mt-0 sm:ml-72 min-h-screen">
                <h1 className="text-3xl text-white font-bold mb-8 text-center">Favoritos</h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {loading
                        ? Array.from({ length: 12 }).map((_, i) => (
                            <ImageCardSkeleton key={i} />
                        ))
                        : favorites.length === 0
                            ? <p className="col-span-full text-center text-white/40 text-sm tracking-widest uppercase py-20">Nenhum favorito salvo</p>
                            : favorites.map((img, idx) => (
                                <ImageCard
                                    key={idx}
                                    url={img.url}
                                    onClick={() => setSelectedImage(img.url)}
                                />
                            ))
                    }
                </div>

                {selectedImage && (
                    <ImageModal
                        url={selectedImage}
                        onClose={() => setSelectedImage(null)}
                        onRemove={() => handleRemove(selectedImage)}
                    />
                )}
            </main>
        </div>
    )
}