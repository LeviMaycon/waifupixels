'use client'

export default function ImageCardSkeleton() {
    return (
        <div
            className="relative overflow-hidden aspect-square w-full"
            style={{ borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.08)' }}
        >
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.8s ease-in-out infinite',
                }}
            />
            <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
        </div>
    )
}