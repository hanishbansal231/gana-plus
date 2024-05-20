import { ReactNode } from "react";

export interface SignUpData {
    name: string;
    userName: string;
    email: string;
    password: string;
}


export interface HeaderProps {
    handleSideBar: () => void;
    isSideBarOpen: boolean;
}



export interface LayoutProps {
    children: ReactNode;
}

export interface MenuItemProps {
    label: string;
    icon: React.ElementType;
    link: string;
    id: number;
    activeId: number,
    setActiveId: (id: number) => void
}

export interface SongListProps {
    title: string
}

export interface ArtistListProps {
}