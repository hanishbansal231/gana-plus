import React from 'react'
import MenuList from './MenuList'

function SideBar() {
    return (
        <div className='min-w-[200px] h-[100vh] bg-black p-4 text-white shadow-sm flex flex-col items-center '>
            <h1 className=' text-white text-2xl font-bold'>LOGO</h1>
            <div className=' mt-6'>
                <MenuList />
            </div>
        </div>
    )
}

export default SideBar