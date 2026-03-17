'use client'

export default function ImageCardSkeleton() {
    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-xl
                bg-white/5
                aspect-square
                w-full
                h-full
                min-w-30
                shadow-md
            "
        >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/8 to-transparent" />
        </div>
    )
}