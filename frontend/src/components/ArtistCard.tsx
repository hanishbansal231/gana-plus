import React from 'react'
import { FaCirclePlay } from "react-icons/fa6";
import "../styles/artistList.css";

const ArtistCard:React.FC = () => {
    return (
        <div className='min-w-[150px] cursor-pointer card'>
            <div className=' relative'>
                <img className=' rounded-full' src="https://c.saavncdn.com/artists/Arijit_Singh_002_20230323062147_500x500.jpg" alt="" />
                <button className=' text-4xl text-white absolute z-50 top-[40%] left-[40%] controlBnt'><FaCirclePlay /></button>
            </div>
            <h3 className=' text-white'>{"Dekhha Tenu (From Mr. And Mrs. Mahi)".substring(0, 15)}...</h3>
            <p className=' text-sm text-gray-400 font-medium'>Arijit Singh</p>
        </div>
    )
}

export default ArtistCard;