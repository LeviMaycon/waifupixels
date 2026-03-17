'use client'

import { ChevronRight } from "lucide-react";
import { SideBarItemProps } from "./types";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SideBarDesktopProps {
    sidebarItems: SideBarItemProps[];
}

export function SideBarDesktop({ sidebarItems }: SideBarDesktopProps) {
    const pathname = usePathname()

    const getDefaultOpen = () =>
        sidebarItems.reduce<number[]>((acc, item, idx) => {
            if (item.children?.some(c => pathname.startsWith(c.href))) acc.push(idx)
            return acc
        }, [])

    const [openItems, setOpenItems] = useState<number[]>(getDefaultOpen)

    useEffect(() => {
        setOpenItems(prev => {
            const fromPath = getDefaultOpen()
            return [...new Set([...prev, ...fromPath])]
        })
    }, [pathname])

    const toggleItem = (idx: number) => {
        setOpenItems(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        )
    }

    const sfwChildren = (item: SideBarItemProps) => item.children?.filter(c => !c.nsfw) ?? []
    const nsfwChildren = (item: SideBarItemProps) => item.children?.filter(c => c.nsfw) ?? []

    return (
        <aside className="hidden sm:flex flex-col fixed top-0 left-0 h-screen w-72 bg-[#0d0d12] border-r border-white/10 shadow-2xl z-40">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/10">
                <span className="text-sm font-bold tracking-wide text-white">Waifu Pixels</span>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
                {sidebarItems.map((item, idx) => {
                    const isOpen = openItems.includes(idx)
                    const hasChildren = !!item.children?.length
                    const isParentActive = item.children?.some(c => pathname.startsWith(c.href))
                    const isDirectActive = !hasChildren && pathname === item.href

                    return (
                        <div key={idx}>
                            {item.active ? (
                                hasChildren ? (
                                    <button
                                        onClick={() => toggleItem(idx)}
                                        className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative overflow-hidden ${
                                            isParentActive
                                                ? 'text-white bg-white/8'
                                                : 'text-white/60 hover:text-white hover:bg-white/8'
                                        }`}
                                    >
                                        <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-linear-to-r from-pink-500/10 to-violet-500/5 transition-opacity duration-200" />
                                        {item.icon && (
                                            <span className={`relative transition-colors duration-150 ${isParentActive ? 'text-pink-400' : 'text-white/40 group-hover:text-pink-400'}`}>
                                                <item.icon size={16} />
                                            </span>
                                        )}
                                        <span className="relative flex-1 text-left">{item.label}</span>
                                        <ChevronRight
                                            size={14}
                                            className={`relative text-white/30 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                                        />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative overflow-hidden ${
                                            isDirectActive
                                                ? 'text-white bg-white/8'
                                                : 'text-white/60 hover:text-white hover:bg-white/8'
                                        }`}
                                    >
                                        <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-linear-to-r from-pink-500/10 to-violet-500/5 transition-opacity duration-200" />
                                        {item.icon && (
                                            <span className={`relative transition-colors duration-150 ${isDirectActive ? 'text-pink-400' : 'text-white/40 group-hover:text-pink-400'}`}>
                                                <item.icon size={16} />
                                            </span>
                                        )}
                                        <span className="relative">{item.label}</span>
                                    </Link>
                                )
                            ) : (
                                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/30 cursor-not-allowed">
                                    {item.icon && <span className="text-white/30"><item.icon size={16} /></span>}
                                    <span>{item.label}</span>
                                </div>
                            )}

                            {hasChildren && isOpen && (
                                <div className="ml-3 mt-0.5 mb-1 pl-3 border-l border-white/8 flex flex-col gap-0.5">
                                    {sfwChildren(item).map((child, cidx) =>
                                        child.active ? (
                                            <Link
                                                key={cidx}
                                                href={child.href}
                                                className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                                                    pathname === child.href
                                                        ? 'text-white bg-white/8'
                                                        : 'text-white/40 hover:text-white/80 hover:bg-white/6'
                                                }`}
                                            >
                                                {pathname === child.href && (
                                                    <span className="w-1 h-1 rounded-full bg-pink-400 shrink-0" />
                                                )}
                                                {child.label}
                                            </Link>
                                        ) : (
                                            <div key={cidx} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-white/20 cursor-not-allowed">
                                                {child.label}
                                            </div>
                                        )
                                    )}

                                    {nsfwChildren(item).length > 0 && (
                                        <>
                                            <div className="flex items-center gap-2 px-3 py-1.5 mt-1">
                                                <div className="flex-1 h-px bg-red-500/20" />
                                                <span className="text-[10px] font-semibold tracking-widest text-red-400/50 uppercase">nsfw</span>
                                                <div className="flex-1 h-px bg-red-500/20" />
                                            </div>
                                            {nsfwChildren(item).map((child, cidx) =>
                                                child.active ? (
                                                    <Link
                                                        key={cidx}
                                                        href={child.href}
                                                        className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                                                            pathname === child.href
                                                                ? 'text-red-300 bg-red-500/10'
                                                                : 'text-red-400/40 hover:text-red-300/80 hover:bg-red-500/8'
                                                        }`}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ) : (
                                                    <div key={cidx} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-400/20 cursor-not-allowed">
                                                        {child.label}
                                                    </div>
                                                )
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            <div className="px-4 py-4 border-t border-white/8">
                <p className="text-[10px] text-white/20 font-medium tracking-widest uppercase">Waifu Pixels © 2026</p>
            </div>
        </aside>
    )
}