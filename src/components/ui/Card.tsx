'use client'

interface ImageCardProps {
    url: string
    onClick: () => void
}

export default function ImageCard({ url, onClick }: ImageCardProps) {
    return (
        <div 
        className={`
            group
            relative
            overflow-hidden
            rounded-xl
            bg-gray-300
            aspect-square
            w-full
            min-w-30
            mmin-h-55
            shadow-md
            hover: shadow-1xl
            transition-shadow
        `}
        onClick={onClick}
        >
            <img
                src={url}
                alt="Imagem gerada"
                className={`
                    w-full h-full
                    object-cover
                    group-hover:scale-110
                    transition-transform: duration-500
                `}
                loading="lazy"
                onError={(e) => {
                    e.currentTarget.src = "/fallback.jpg"
                }}
            />
            <div className="absolute inset-0 cursor-pointer bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-lg font-semibold">Visualizar</span>
            </div>
        </div>
    )
}