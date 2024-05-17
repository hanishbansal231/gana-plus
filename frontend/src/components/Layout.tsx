import React, { useState } from 'react';
import SideBar from './SideBar';
import Header from './Header';

function Layout() {
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);

    function handleSideBar() {
        setIsSideBarOpen(!isSideBarOpen);
    }

    return (
        <div className='bg-[#161616] h-screen w-screen overflow-hidden flex flex-row gap-2'>
            {isSideBarOpen && <SideBar />}
            <div className='flex flex-col flex-1 overflow-hidden'>
                <Header handleSideBar={handleSideBar} isSideBarOpen={isSideBarOpen} />
                <div className='flex-1 p-4 min-h-0 overflow-auto'>
                    <h1>Hello</h1>
                </div>
            </div>
        </div>
    );
}

export default Layout;
