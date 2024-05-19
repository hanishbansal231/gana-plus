import React, { ReactElement, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface MenuItemProps {
    label: string;
    icon: React.ElementType;
    link: string;
    id: number;
    activeId: number,
    setActiveId: (id: number) => void
}

function MenuItem({ label, icon: Icon, link, id, activeId, setActiveId }: MenuItemProps): ReactElement {
    function handleActiveNavItem(id: number): void {
        setActiveId(id);
    }

    return (
        <li
            onClick={() => handleActiveNavItem(id)}
            className='flex items-center w-full py-1 px-4 rounded-sm'
            style={{ backgroundColor: id === activeId ? 'red' : 'transparent' }}
        >
            <NavLink to={link} className="flex items-center gap-2">
                <Icon className="text-2xl" />
                {label}
            </NavLink>
        </li>
    );
}

export default MenuItem;
