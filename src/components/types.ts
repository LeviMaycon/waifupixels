export interface SideBarItemProps {
    label: string
    href: string
    icon: any
    active: boolean
    nsfw?: boolean
    children?: SideBarItemProps[]
}

export interface SidebarLinkProps {
    label: string
    href: string
    icon?: any
    active?: boolean
    children?: SidebarLinkProps[]
}