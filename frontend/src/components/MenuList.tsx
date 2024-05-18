import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuItem from './MenuItem';
import { MdOutlineHome } from 'react-icons/md';

function MenuList() {
    const menuData = [
        {
            id: 1,
            label: 'Home',
            icon: MdOutlineHome,
            link: '/'
        },
        {
            id: 2,
            label: 'My Music',
            icon: MdOutlineHome,
            link: '/'
        },
        {
            id: 3,
            label: 'Trending Song',
            icon: MdOutlineHome,
            link: '/'
        },
        {
            id: 4,
            label: 'New Song',
            icon: MdOutlineHome,
            link: '/'
        },
        {
            id: 5,
            label: 'Old Song',
            icon: MdOutlineHome,
            link: '/'
        },
        {
            id: 6,
            label: 'Hindi Song',
            icon: MdOutlineHome,
            link: '/'
        },
        {
            id: 7,
            label: 'Punjabi Song',
            icon: MdOutlineHome,
            link: '/'
        },
        {
            id: 8,
            label: 'Haryani Song',
            icon: MdOutlineHome,
            link: '/haryani'
        },
    ];

    return (
        <ul className=' flex flex-col gap-4'>
            {menuData.map((item, i) => <MenuItem key={i} label={item.label} icon={item.icon} link={item.link} />)}
        </ul>
    );
}

export default MenuList;
