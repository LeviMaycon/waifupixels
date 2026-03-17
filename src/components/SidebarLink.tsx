import Link from "next/link";
import { FC } from "react";
import { SidebarLinkProps } from "./types";


export const SidebarLink: FC<SidebarLinkProps> = ({ label, href, icon: Icon, active = true, children }) => {
    return (
        <div className="flex flex-col">
            {active ? (
                <Link
                    href={href}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all duration-150 relative overflow-hidden"
                >
                    {Icon && <Icon size={16} className="relative text-white/40 group-hover:text-pink-400 transition-colors duration-150" />}
                    <span className="relative">{label}</span>
                </Link>
            ) : (
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/30 cursor-not-allowed">
                    {Icon && <Icon size={16} className="text-white/30" />}
                    <span>{label}</span>
                </div>
            )}

            {/* Submenus */}
            {children && (
                <div className="ml-6 mt-1 flex flex-col gap-1">
                    {children.map(sub => (
                        <SidebarLink key={sub.href} {...sub} />
                    ))}
                </div>
            )}
        </div>
    )
}