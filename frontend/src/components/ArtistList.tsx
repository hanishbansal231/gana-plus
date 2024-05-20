import React from 'react';
import TrendingSongCard from './SongCard';
import "../styles/artistList.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { ArtistListProps } from '../interface/interface';
import ArtistCard from './ArtistCard';

const ArtistList: React.FC<ArtistListProps> = () => {
    function handleLeftArrowBtn(): void {
        const cards = document.getElementById("cards");
        if (cards) {
            cards.scrollLeft -= 400;
        }
    }

    function handleRightArrowBtn(): void {
        const cards = document.getElementById("cards");
        if (cards) {
            cards.scrollLeft += 400;
        }
    }

    return (
        <div className='relative mt-5'>
            <div className='flex justify-between items-center'>
                <h2 className='text-white text-xl font-semibold mb-2'>Popular artists</h2>
                <NavLink to="/" className="text-gray-400 text-xs font-medium">Show all</NavLink>
            </div>
            <div>
                <button onClick={handleLeftArrowBtn} className='text-white text-3xl absolute top-[36%] left-0 z-50'><IoIosArrowBack /></button>
                <button onClick={handleRightArrowBtn} className='text-white text-3xl absolute top-[36%] right-0 z-50'><IoIosArrowForward /></button>
            </div>
            <div className='flex gap-6 overflow-x-auto scroll-smooth cards' id='cards'>
                {Array(20).fill(1).map((_, index) => <ArtistCard key={index} />)}
            </div>
        </div>
    );
}

export default ArtistList;
