'use client'

import Link from 'next/link'
import SideBar from '@/src/components/SideBar'

const waifuCategories = [
    { label: 'Waifu',   href: '/waifu/sfw/waifu' },
    { label: 'Neko',    href: '/waifu/sfw/neko' },
    { label: 'Shinobu', href: '/waifu/sfw/shinobu' },
    { label: 'Megumin', href: '/waifu/sfw/megumin' },
    { label: 'Hug',     href: '/waifu/sfw/hug' },
    { label: 'Kiss',    href: '/waifu/sfw/kiss' },
    { label: 'Pat',     href: '/waifu/sfw/pat' },
    { label: 'Cuddle',  href: '/waifu/sfw/cuddle' },
    { label: 'Cry',     href: '/waifu/sfw/cry' },
    { label: 'Blush',   href: '/waifu/sfw/blush' },
    { label: 'Smile',   href: '/waifu/sfw/smile' },
    { label: 'Wave',    href: '/waifu/sfw/wave' },
    { label: 'Dance',   href: '/waifu/sfw/dance' },
    { label: 'Wink',    href: '/waifu/sfw/wink' },
    { label: 'Poke',    href: '/waifu/sfw/poke' },
]

const nekosBestCategories = [
    { label: 'Neko',    href: '/nekosbest/neko' },
    { label: 'Waifu',   href: '/nekosbest/waifu' },
    { label: 'Kitsune', href: '/nekosbest/kitsune' },
    { label: 'Hug',     href: '/nekosbest/hug' },
    { label: 'Pat',     href: '/nekosbest/pat' },
    { label: 'Kiss',    href: '/nekosbest/kiss' },
    { label: 'Dance',   href: '/nekosbest/dance' },
    { label: 'Cry',     href: '/nekosbest/cry' },
]

const quickLinks = [
    { label: 'Explorar Nekos', sub: 'Busca por tags', href: '/nekos/explore' },
    { label: 'Reels', sub: 'Scroll infinito', href: '/reels' },
    { label: 'Favoritos', sub: 'Imagens salvas', href: '/favorites' },
]

export default function Home() {
    return (
        <div className="flex min-h-screen bg-[#0a0a0f]">
            <SideBar />
            <main className="flex-1 mt-16 sm:mt-0 sm:ml-72 overflow-x-hidden">

                <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: 'radial-gradient(ellipse 50% 35% at 50% 0%, rgba(168,85,247,0.07) 0%, transparent 70%)',
                    }} />
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.02) 39px, rgba(255,255,255,0.02) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.02) 39px, rgba(255,255,255,0.02) 40px)`,
                    }} />

                    <p className="text-[10px] tracking-[0.5em] text-white/20 uppercase mb-5" style={{ animation: 'fadeUp 0.5s ease both' }}>
                        Galeria de imagens anime
                    </p>

                    <h1 className="text-7xl sm:text-9xl font-black leading-none tracking-tighter mb-4" style={{ animation: 'fadeUp 0.5s ease 0.08s both' }}>
                        <span className="text-white">Waifu</span>
                        <span className="text-white/8"> Pixels</span>
                    </h1>

                    <p className="text-white/25 text-sm max-w-sm leading-relaxed mb-12" style={{ animation: 'fadeUp 0.5s ease 0.16s both' }}>
                        Centenas de ilustrações anime organizadas por categoria, com suporte a GIFs e scroll infinito
                    </p>

                    <div className="flex items-center gap-3" style={{ animation: 'fadeUp 0.5s ease 0.24s both' }}>
                        {quickLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex flex-col items-center px-5 py-3 border border-white/8 rounded-lg hover:border-white/20 hover:bg-white/3 transition-all duration-200 group"
                            >
                                <span className="text-xs font-semibold text-white/50 group-hover:text-white/90 transition-colors duration-200">{link.label}</span>
                                <span className="text-[10px] text-white/20 group-hover:text-white/40 transition-colors duration-200 mt-0.5">{link.sub}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="px-6 pb-16 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1 h-4 bg-violet-500/40 rounded-full" />
                        <span className="text-[10px] tracking-[0.35em] text-white/25 uppercase">Waifu.pics</span>
                        <div className="flex-1 h-px bg-white/4" />
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                        {waifuCategories.map((cat, idx) => (
                            <Link
                                key={cat.href}
                                href={cat.href}
                                className="group relative flex items-center justify-center py-4 border border-white/5 rounded hover:border-white/15 hover:bg-white/3 transition-all duration-200"
                                style={{ animation: `fadeUp 0.4s ease ${0.03 * idx}s both` }}
                            >
                                <span className="text-[11px] font-semibold tracking-[0.15em] text-white/30 uppercase group-hover:text-white/70 transition-colors duration-200">
                                    {cat.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="px-6 pb-24 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1 h-4 bg-pink-500/40 rounded-full" />
                        <span className="text-[10px] tracking-[0.35em] text-white/25 uppercase">Nekos.best</span>
                        <span className="text-[9px] text-pink-400/40 tracking-widest uppercase border border-pink-500/15 rounded px-2 py-0.5">GIF</span>
                        <div className="flex-1 h-px bg-white/4" />
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                        {nekosBestCategories.map((cat, idx) => (
                            <Link
                                key={cat.href}
                                href={cat.href}
                                className="group relative flex items-center justify-center py-4 border border-white/5 rounded hover:border-pink-500/20 hover:bg-pink-500/3 transition-all duration-200"
                                style={{ animation: `fadeUp 0.4s ease ${0.03 * idx}s both` }}
                            >
                                <span className="text-[11px] font-semibold tracking-[0.15em] text-white/30 uppercase group-hover:text-pink-300/70 transition-colors duration-200">
                                    {cat.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                <style>{`
                    @keyframes fadeUp {
                        from { opacity: 0; transform: translateY(12px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </main>
        </div>
    )
}