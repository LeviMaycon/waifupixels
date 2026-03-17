'use client'

import { useState } from 'react'

interface ImageCardProps {
    url: string
    onClick: () => void
}

export default function ImageCard({ url, onClick }: ImageCardProps) {
    const [loaded, setLoaded] = useState(false)

    return (
        <div
            onClick={onClick}
            className="group relative overflow-hidden aspect-square w-full cursor-pointer bg-white/3"
            style={{ borderRadius: '4px' }}
        >
            <img
                src={url}
                alt="Imagem"
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease, transform 0.7s ease' }}
            />

            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(0,0,0,0.45)' }}
            />

            <span
                className="absolute bottom-0 left-0 right-0 text-center text-[11px] font-semibold tracking-[0.2em] uppercase text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                style={{ padding: '10px 0', letterSpacing: '0.2em' }}
            >
                Visualizar
            </span>

            <span className="absolute top-2 left-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ borderTop: '1.5px solid white', borderLeft: '1.5px solid white' }} />
            <span className="absolute top-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ borderTop: '1.5px solid white', borderRight: '1.5px solid white' }} />
            <span className="absolute bottom-2 left-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ borderBottom: '1.5px solid white', borderLeft: '1.5px solid white' }} />
            <span className="absolute bottom-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ borderBottom: '1.5px solid white', borderRight: '1.5px solid white' }} />

            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ outline: '1px solid rgba(255,255,255,0.15)', outlineOffset: '-1px' }}
            />
        </div>
    )
}