'use client'

import { X, Heart, Download, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface ImageModalProps {
    url: string
    onClose: () => void
    onRemove?: () => void
}

export default function ImageModal({ url, onClose, onRemove }: ImageModalProps) {
    const [saved, setSaved] = useState(() => {
        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]')
        return favorites.includes(url)
    })

    const handleSave = () => {
        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]')
        if (!favorites.includes(url)) {
            favorites.push(url)
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }
        setSaved(true)
    }

    const handleDownload = () => {
        const a = document.createElement('a')
        a.href = `/api/download?url=${encodeURIComponent(url)}`
        a.download = url.split('/').pop() || 'image'
        a.click()
    }

    return (
        <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="relative flex flex-col items-center gap-4 max-w-5xl w-full"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="absolute -top-10 right-0 text-white/50 hover:text-white transition-colors"
                    onClick={onClose}
                >
                    <X size={22} />
                </button>

                <img
                    src={url}
                    alt="Ampliada"
                    className="max-w-full max-h-[80vh] object-contain rounded-sm shadow-2xl"
                />

                <div className="flex items-center gap-3">
                    {!onRemove && (
                        <button
                            onClick={handleSave}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                                saved
                                    ? 'bg-pink-500/20 border-pink-500/40 text-pink-400'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <Heart size={15} className={saved ? 'fill-pink-400' : ''} />
                            {saved ? 'Salvo' : 'Favoritar'}
                        </button>
                    )}

                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200"
                    >
                        <Download size={15} />
                        Baixar
                    </button>

                    {onRemove && (
                        <button
                            onClick={onRemove}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-red-500/10 border border-red-500/20 text-red-400/60 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
                        >
                            <Trash2 size={15} />
                            Remover
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}