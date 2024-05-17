import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

interface MenuItemProps {
    label: string;
    icon: React.ElementType;
    link: string;
}

function MenuItem({ label, icon: Icon, link }: MenuItemProps): ReactElement {
    return (
        <li className=' bg-red-400 flex items-center w-full py-1 px-4 rounded-sm'>
            <NavLink to={link} className="flex items-center gap-2">
                <Icon className="text-2xl" />
                {label}
            </NavLink>
        </li>
    );
}

export default MenuItem;
