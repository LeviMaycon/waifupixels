'use client'

import { ChevronRight, Menu, X } from "lucide-react";
import { SideBarItemProps } from "./types";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SideBarMobileProps {
    sidebarItems: SideBarItemProps[];
}

export function SideBarMobile({ sidebarItems }: SideBarMobileProps) {
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

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="fixed top-3 left-3 z-50 h-9 w-9 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:text-white transition-all duration-200 shadow-lg">
                    <Menu size={18} />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" hideClose className="w-72 p-0 border-r border-white/10 bg-[#0d0d12] text-white shadow-2xl">
                <div className="flex flex-col h-full">
                    <SheetHeader className="flex flex-row justify-between items-center px-5 py-4 border-b border-white/10">
                        <span className="text-sm font-bold tracking-wide text-white">Waifu Pixels</span>
                        <SheetClose asChild>
                            <Button className="h-7 w-7 p-0 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all duration-150" variant="ghost">
                                <X size={14} />
                            </Button>
                        </SheetClose>
                    </SheetHeader>

                    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
                        {sidebarItems.map((item, idx) => {
                            const isOpen = openItems.includes(idx)
                            const hasChildren = !!item.children?.length
                            const isParentActive = item.children?.some(c => pathname.startsWith(c.href))
                            const isDirectActive = !hasChildren && pathname === item.href

                            const sfwChildren = item.children?.filter(c => !c.nsfw) ?? []
                            const nsfwChildren = item.children?.filter(c => c.nsfw) ?? []

                            if (!item.active) {
                                return (
                                    <div key={idx} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/30 cursor-not-allowed">
                                        {item.icon && <span className="text-white/30"><item.icon size={16} /></span>}
                                        <span>{item.label}</span>
                                    </div>
                                )
                            }

                            return (
                                <div key={idx} className="flex flex-col">
                                    {hasChildren ? (
                                        <button
                                            onClick={() => toggleItem(idx)}
                                            className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative overflow-hidden ${
                                                isParentActive ? 'text-white bg-white/8' : 'text-white/60 hover:text-white hover:bg-white/8'
                                            }`}
                                        >
                                            {item.icon && (
                                                <span className={`relative transition-colors duration-150 ${isParentActive ? 'text-pink-400' : 'text-white/40 group-hover:text-pink-400'}`}>
                                                    <item.icon size={16} />
                                                </span>
                                            )}
                                            <span className="relative flex-1 text-left">{item.label}</span>
                                            <ChevronRight size={14} className={`relative text-white/30 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative overflow-hidden ${
                                                isDirectActive ? 'text-white bg-white/8' : 'text-white/60 hover:text-white hover:bg-white/8'
                                            }`}
                                        >
                                            {item.icon && (
                                                <span className={`relative transition-colors duration-150 ${isDirectActive ? 'text-pink-400' : 'text-white/40 group-hover:text-pink-400'}`}>
                                                    <item.icon size={16} />
                                                </span>
                                            )}
                                            <span className="relative flex-1">{item.label}</span>
                                        </Link>
                                    )}

                                    {hasChildren && isOpen && (
                                        <div className="ml-3 mt-0.5 mb-1 pl-3 border-l border-white/8 flex flex-col gap-0.5">
                                            {sfwChildren.map((child, cidx) =>
                                                child.active ? (
                                                    <Link
                                                        key={cidx}
                                                        href={child.href}
                                                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
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

                                            {nsfwChildren.length > 0 && (
                                                <>
                                                    <div className="flex items-center gap-2 px-3 py-1.5 mt-1">
                                                        <div className="flex-1 h-px bg-red-500/20" />
                                                        <span className="text-[10px] font-semibold tracking-widest text-red-400/50 uppercase">nsfw</span>
                                                        <div className="flex-1 h-px bg-red-500/20" />
                                                    </div>
                                                    {nsfwChildren.map((child, cidx) =>
                                                        child.active ? (
                                                            <Link
                                                                key={cidx}
                                                                href={child.href}
                                                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
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
                </div>
            </SheetContent>
        </Sheet>
    )
}