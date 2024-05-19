import React from 'react';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import SignUpModel from './SignUpModel';

interface HeaderProps {
    handleSideBar: () => void;
    isSideBarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ handleSideBar, isSideBarOpen }) => {

    // <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button>
    function handleSignUpModel(): void {
        document.getElementById('my_modal_3').showModal()
    }
    return (
        <div className='bg-black h-[60px] shadow-sm'>
            <div className='flex justify-between items-center h-full px-6'>
                <div>
                    <button onClick={handleSideBar} className='text-white font-semibold text-2xl rounded-sm'>
                        {isSideBarOpen ? <RiArrowLeftDoubleFill /> : <RiArrowRightDoubleFill />}
                    </button>
                </div>
                <div>
                    <input
                        className='py-2 px-4 min-w-[400px] rounded-tl-3xl rounded-bl-3xl'
                        type="text"
                        placeholder='search...'
                    />
                    <button className='py-2 px-4 text-white border rounded-tr-3xl rounded-br-3xl'>Search</button>
                </div>
                <div className='flex gap-6'>
                    <button className='border text-white py-2 px-6 font-semibold text-lg rounded-3xl'>Login</button>
                    <button onClick={handleSignUpModel} className='bg-white py-2 px-6 font-semibold text-lg rounded-3xl'>SignUp</button>
                </div>
            </div>
            <SignUpModel />
        </div>
    );
};

export default Header;
