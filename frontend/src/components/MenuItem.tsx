import React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItemProps } from '../interface/interface';


function MenuItem({ label, icon: Icon, link, id, activeId, setActiveId }: MenuItemProps): React.ReactElement {
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
