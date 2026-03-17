'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    if (totalPages <= 1) return null

    function getPages(): (number | '...')[] {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
        if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages]
        if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
    }

    function getMobilePages(): (number | '...')[] {
        if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1)
        if (currentPage === 1) return [1, 2, '...', totalPages]
        if (currentPage === totalPages) return [1, '...', totalPages - 1, totalPages]
        return [1, '...', currentPage, '...', totalPages]
    }

    const btnBase = `flex items-center gap-1.5 px-3 py-2 sm:px-4 text-sm font-medium rounded-[10px]
    border border-white/10 bg-white/5 text-white/50
    hover:bg-white/10 hover:text-white hover:border-white/20
    disabled:opacity-30 disabled:cursor-not-allowed
    transition-all duration-150 active:scale-95 cursor-pointer`

    const pageBtn = (page: number, i: number) => (
        <button
            key={i}
            onClick={() => onPageChange(page)}
            className={`h-9 min-w-9 px-2.5 text-sm font-medium rounded-[10px]
            border transition-all duration-150 active:scale-95 cursor-pointer
            ${page === currentPage
                    ? 'bg-violet-600 text-white border-violet-600 shadow-[0_2px_16px_rgba(124,58,237,0.4)]'
                    : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                }`}
        >
            {page}
        </button>
    )

    return (
        <div className="mt-10 flex justify-center items-center gap-1.5">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={btnBase}>
                <ChevronLeft size={15} />
                <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5">
                {getPages().map((page, i) =>
                    page === '...'
                        ? <span key={`dots-${i}`} className="px-1 text-white/30 text-sm select-none">···</span>
                        : pageBtn(page, i)
                )}
            </div>

            <div className="flex sm:hidden items-center gap-1.5">
                {getMobilePages().map((page, i) =>
                    page === '...'
                        ? <span key={`dots-${i}`} className="px-1 text-white/30 text-sm select-none">···</span>
                        : pageBtn(page, i)
                )}
            </div>

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={btnBase}>
                <span className="hidden sm:inline">Próximo</span>
                <ChevronRight size={15} />
            </button>
        </div>
    )
}