'use client'

import { Home, Star, ZodiacScorpio, ZodiacVirgo } from "lucide-react";
import { useMediaQuery } from "usehooks-ts"; 
import { SideBarItemProps } from "./types";
import { SideBarDesktop } from "./SideBarDesktop";
import { SideBarMobile } from "./SideBarMobile";

const sidebarItems: SideBarItemProps[] = [
    { label: 'Home', href: '/', icon: Home },
    {
        label: 'SFW',
        href: '/sfw',
        icon: ZodiacScorpio,
        children: [
            { label: 'WAIFU', href: '/sfw/waifu', icon: '' },
            { label: 'NEKO', href: '/sfw/neko', icon: '' },
            { label: 'SHINOBU', href: '/sfw/shinobu', icon: '' },
            { label: 'MEGUMIN', href: '/sfw/megumin', icon: '' },
            { label: 'BULLY', href: '/sfw/bully', icon: '' },
            { label: 'CUDDLE', href: '/sfw/cuddle', icon: '' },
            { label: 'CRY', href: '/sfw/cry', icon: '' },
            { label: 'HUG', href: '/sfw/hug', icon: '' },
            { label: 'AWOO', href: '/sfw/awoo', icon: '' },
            { label: 'KISS', href: '/sfw/kiss', icon: '' },
            { label: 'LICK', href: '/sfw/lick', icon: '' },
            { label: 'PAT', href: '/sfw/pat', icon: '' },
            { label: 'SMUG', href: '/sfw/smug', icon: '' },
            { label: 'BONK', href: '/sfw/bonk', icon: '' },
            { label: 'YEET', href: '/sfw/yeet', icon: '' },
            { label: 'BLUSH', href: '/sfw/blush', icon: '' },
            { label: 'SMILE', href: '/sfw/smile', icon: '' },
            { label: 'WAVE', href: '/sfw/wave', icon: '' },
            { label: 'HIGHFIVE', href: '/sfw/highfive', icon: '' },
            { label: 'HANDHOLD', href: '/sfw/handhold', icon: '' },
            { label: 'NOM', href: '/sfw/nom', icon: '' },
            { label: 'BITE', href: '/sfw/bite', icon: '' },
            { label: 'GLOMP', href: '/sfw/glomp', icon: '' },
            { label: 'SLAP', href: '/sfw/slap', icon: '' },
            { label: 'KILL', href: '/sfw/kill', icon: '' },
            { label: 'KICK', href: '/sfw/kick', icon: '' },
            { label: 'HAPPY', href: '/sfw/happy', icon: '' },
            { label: 'WINK', href: '/sfw/wink', icon: '' },
            { label: 'POKE', href: '/sfw/poke', icon: '' },
            { label: 'DANCE', href: '/sfw/dance', icon: '' },
            { label: 'CRINGE', href: '/sfw/cringe', icon: '' },
        ]
    },
    {
        label: 'NSFW',
        href: '/nsfw',
        icon: ZodiacVirgo,
        children: [
            { label: 'WAIFU', href: '/nsfw/waifu', icon: '' },
            { label: 'NEKO', href: '/nsfw/neko', icon: '' },
            { label: 'TRAP', href: '/nsfw/trap', icon: '' },
            { label: 'BLOWJOB', href: '/nsfw/blowjob', icon: '' },
        ]
    },
    { label: 'Favorites', href: '/favorites', icon: Star }
];

export default function SideBar() {
    const isDesktop = useMediaQuery('(min-width: 640px)', {initializeWithValue: undefined,});
    if (isDesktop) return <SideBarDesktop sidebarItems={sidebarItems} />;

    return <SideBarMobile sidebarItems={sidebarItems}/>;
}