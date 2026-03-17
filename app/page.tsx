'use client'

import Link from 'next/link'
import SideBar from '@/src/components/SideBar'

const waifuCategories = [
  { label: 'Waifu', href: '/waifu/sfw/waifu' },
  { label: 'Neko', href: '/waifu/sfw/neko' },
  { label: 'Shinobu', href: '/waifu/sfw/shinobu' },
  { label: 'Megumin', href: '/waifu/sfw/megumin' },
  { label: 'Hug', href: '/waifu/sfw/hug' },
  { label: 'Kiss', href: '/waifu/sfw/kiss' },
  { label: 'Pat', href: '/waifu/sfw/pat' },
  { label: 'Cuddle', href: '/waifu/sfw/cuddle' },
  { label: 'Cry', href: '/waifu/sfw/cry' },
  { label: 'Blush', href: '/waifu/sfw/blush' },
  { label: 'Smile', href: '/waifu/sfw/smile' },
  { label: 'Wave', href: '/waifu/sfw/wave' },
  { label: 'Dance', href: '/waifu/sfw/dance' },
  { label: 'Wink', href: '/waifu/sfw/wink' },
  { label: 'Poke', href: '/waifu/sfw/poke' },
]

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <SideBar />
      <main className="flex-1 mt-16 sm:mt-0 sm:ml-72">

        <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(168,85,247,0.08) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px),
                            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px)`,
            }}
          />

          <p
            className="text-[11px] tracking-[0.4em] text-white/30 uppercase mb-6"
            style={{ animation: 'fadeUp 0.6s ease both' }}
          >
            Galeria de imagens anime
          </p>

          <h1
            className="text-6xl sm:text-8xl font-black text-white leading-none tracking-tighter mb-6"
            style={{ animation: 'fadeUp 0.6s ease 0.1s both' }}
          >
            Waifu
            <span className="text-white/10"> Pixels</span>
          </h1>

          <p
            className="text-white/30 text-sm max-w-xs leading-relaxed mb-10"
            style={{ animation: 'fadeUp 0.6s ease 0.2s both' }}
          >
            Explore centenas de ilustrações anime organizadas por categoria
          </p>

          <Link
            href="/nekos/explore"
            className="px-7 py-3 text-sm font-medium text-white/70 border border-white/10 rounded-full hover:bg-white/5 hover:text-white transition-all duration-200"
            style={{ animation: 'fadeUp 0.6s ease 0.3s both' }}
          >
            Explorar Nekos →
          </Link>
        </section>

        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] tracking-[0.3em] text-white/20 uppercase">Categorias Waifu</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {waifuCategories.map((cat, idx) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group relative flex items-center justify-center px-4 py-6 border border-white/6 rounded-sm hover:border-white/20 hover:bg-white/3 transition-all duration-200"
                style={{ animation: `fadeUp 0.5s ease ${0.05 * idx}s both` }}
              >
                <span className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase group-hover:text-white/80 transition-colors duration-200">
                  {cat.label}
                </span>
                <span
                  className="absolute top-2 right-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.3)', borderRight: '1px solid rgba(255,255,255,0.3)' }}
                />
              </Link>
            ))}
          </div>
        </section>

        <style>{`
                    @keyframes fadeUp {
                        from { opacity: 0; transform: translateY(16px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
      </main>
    </div>
  )
}