'use client'

import { Clapperboard, Home, Star, ZodiacScorpio, ZodiacVirgo } from "lucide-react";
import { useMediaQuery } from "usehooks-ts"; 
import { SideBarDesktop } from "./SideBarDesktop";
import { SideBarMobile } from "./SideBarMobile";
import { SideBarItemProps } from "./types";
import { useState, useEffect } from "react";

const sidebarItems: SideBarItemProps[] = [
    { label: 'Home', href: '/', icon: Home, active: true },
    {
        label: 'Waifu',
        href: '/waifu',
        icon: ZodiacScorpio,
        active: true,
        children: [
            { label: 'WAIFU',   href: '/waifu/sfw/waifu',    icon: '', active: true },
            { label: 'NEKO',    href: '/waifu/sfw/neko',     icon: '', active: true },
            { label: 'SHINOBU', href: '/waifu/sfw/shinobu',  icon: '', active: true },
            { label: 'MEGUMIN', href: '/waifu/sfw/megumin',  icon: '', active: true },
            { label: 'HUG',     href: '/waifu/sfw/hug',      icon: '', active: true },
            { label: 'KISS',    href: '/waifu/sfw/kiss',     icon: '', active: true },
            { label: 'PAT',     href: '/waifu/sfw/pat',      icon: '', active: true },
            { label: 'CUDDLE',  href: '/waifu/sfw/cuddle',   icon: '', active: true },
            { label: 'CRY',     href: '/waifu/sfw/cry',      icon: '', active: true },
            { label: 'BLUSH',   href: '/waifu/sfw/blush',    icon: '', active: true },
            { label: 'SMILE',   href: '/waifu/sfw/smile',    icon: '', active: true },
            { label: 'WAVE',    href: '/waifu/sfw/wave',     icon: '', active: true },
            { label: 'DANCE',   href: '/waifu/sfw/dance',    icon: '', active: true },
            { label: 'WINK',    href: '/waifu/sfw/wink',     icon: '', active: true },
            { label: 'POKE',    href: '/waifu/sfw/poke',     icon: '', active: true },
        ]
    },
    {
        label: 'Nekos',
        href: '/nekos',
        icon: ZodiacVirgo,
        active: true,
        children: [
            { label: 'Explorar SFW',  href: '/nekos/explore',      icon: '', active: true },
        ]
    },
    { label: 'Reels', href: '/reels', icon: Clapperboard, active: false },
    { label: 'Favorites', href: '/favorites', icon: Star, active: true },
]

export default function SideBar() {
    const [mounted, setMounted] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 640px)', { initializeWithValue: false })

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    if (isDesktop) return <SideBarDesktop sidebarItems={sidebarItems} />
    return <SideBarMobile sidebarItems={sidebarItems} />
}