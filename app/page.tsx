'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import Pagination from '@/src/components/ui/Pagination';
import ImageCard from '@/src/components/ui/Card';
import SideBar from '@/src/components/SideBar';
import ImageCardSkeleton from '@/src/components/ui/ImageCardSkeleton';

interface ImageData { url: string }

const ITEMS_PER_PAGE = 100;

export default function Home() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentPage = Number(searchParams.get('page')) || 1

  const [allImages, setAllImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    async function loadAllImages() {
      setLoading(true)
      try {
        const totalToLoad = 40;
        const promises = Array.from({ length: totalToLoad }, () =>
          fetch('/api/search').then(res => res.json())
        )
        const results = await Promise.all(promises)
        const images = results.map(r => ({ url: r.image })).filter(Boolean)
        setAllImages(images)
      } catch (err) {
        setError("Erro ao carregar imagens")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadAllImages()
  }, [])

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedImages = allImages.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  const totalPages = Math.ceil(allImages.length / ITEMS_PER_PAGE)

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const openModal = (url: string) => setSelectedImage(url)
  const closeModal = () => setSelectedImage(null)

  if (loading) return <div className="p-8 text-center">Carregando galeria...</div>
  if (error) return <div className="p-8 text-red-600">{error}</div>

  return (
    <div className='flex min-h-screen'>
      <SideBar/>
      <main className="flex-1 p-2">
        <h1 className="text-3xl text-white font-bold mb-8 text-center">Galeria de Imagens</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <ImageCardSkeleton key={i} />
              ))
            : paginatedImages.map((img, idx) => (
                <ImageCard
                  key={startIndex + idx}
                  url={img.url}
                  onClick={() => openModal(img.url)}
                />
              ))
          }
        </div>
        
        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        )}

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div className="relative max-w-5xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
              <button
                className="absolute -top-12 right-4 text-white text-5xl hover:text-gray-300"
                onClick={closeModal}
              >
                ×
              </button>
              <img
                src={selectedImage}
                alt="Ampliada"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>
        )}
      
      </main>
    </div>
  )
}