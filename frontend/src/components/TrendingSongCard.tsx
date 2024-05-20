import React from 'react'
import { FaCirclePlay } from "react-icons/fa6";
import "../styles/trendingSongList.css";

function TrendingSongCard() {
    const content = "Dekhha Tenu (From Mr. And Mrs. Mahi)"
    return (
        <div className='min-w-[200px] card'>
            <div className=' relative cardImgBox'>
                <img src="https://c.saavncdn.com/395/Dekhha-Tenu-From-Mr-And-Mrs-Mahi-Hindi-2024-20240514202401-500x500.jpg" alt="" />
                <button className=' text-4xl text-white absolute z-50 top-1/2 left-[40%] controlBnt'><FaCirclePlay /></button>
            </div>
            <h3 className=' text-white'>{"Dekhha Tenu (From Mr. And Mrs. Mahi)".substring(0, 20)}...</h3>
            <p className=' text-sm text-gray-400 font-medium'>Jaani, Mohammad Faiz</p>
        </div>
    )
}

export default TrendingSongCard