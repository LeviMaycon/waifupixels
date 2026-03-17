'use client'

import { ChevronRight } from "lucide-react";
import { SideBarItemProps } from "./types";
import Link from "next/link";
import { useState } from "react";

interface SideBarDesktopProps {
    sidebarItems: SideBarItemProps[];
}

export function SideBarDesktop({ sidebarItems }: SideBarDesktopProps) {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (idx: number) => {
        setOpenItems(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    return (
        <aside className="hidden sm:flex flex-col fixed top-0 left-0 h-screen w-72 bg-[#0d0d12] border-r border-white/10 shadow-2xl z-40">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/10">
                <span className="text-sm font-bold tracking-wide text-white">
                    Waifu Pixels
                </span>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
                {sidebarItems.map((item, idx) => {
                    const isOpen = openItems.includes(idx);
                    const hasChildren = !!item.children?.length;

                    return (
                        <div key={idx}>
                            {hasChildren ? (
                                <button
                                    onClick={() => toggleItem(idx)}
                                    className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all duration-150 relative overflow-hidden"
                                >
                                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-pink-500/10 to-violet-500/5 transition-opacity duration-200" />
                                    {item.icon && (
                                        <span className="relative text-white/40 group-hover:text-pink-400 transition-colors duration-150">
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
                                    className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all duration-150 relative overflow-hidden"
                                >
                                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-pink-500/10 to-violet-500/5 transition-opacity duration-200" />
                                    {item.icon && (
                                        <span className="relative text-white/40 group-hover:text-pink-400 transition-colors duration-150">
                                            <item.icon size={16} />
                                        </span>
                                    )}
                                    <span className="relative">{item.label}</span>
                                </Link>
                            )}

                            {hasChildren && isOpen && (
                                <div className="ml-3 mt-0.5 mb-1 pl-3 border-l border-white/8 flex flex-col gap-0.5">
                                    {item.children!.map((child, cidx) => (
                                        <Link
                                            key={cidx}
                                            href={child.href}
                                            className="group flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-white/40 hover:text-white/80 hover:bg-white/6 transition-all duration-150"
                                        >
                                            {child.icon && (
                                                <span className="text-white/30 group-hover:text-pink-400/80 transition-colors duration-150">
                                                    <child.icon size={13} />
                                                </span>
                                            )}
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className="px-4 py-4 border-t border-white/8">
                <p className="text-[10px] text-white/20 font-medium tracking-widest uppercase">
                    Waifu Pixels © 2026
                </p>
            </div>
        </aside>
    );
}