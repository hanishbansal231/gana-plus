import React from 'react'; // Import React
import TrendingSongCard from './TrendingSongCard';
import "../styles/trendingSongList.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function TrendingSongList() {
    function handleLeftArrowBtn() {
        const cards = document.getElementById("cards");
        if (cards) {
            cards.scrollLeft -= 400;
        }
    }

    function handleRightArrowBtn() {
        const cards = document.getElementById("cards");
        if (cards) {
            cards.scrollLeft += 400;
        }
    }

    return (
        <div className='relative mt-5'>
            <h2 className=' text-white text-xl font-semibold mb-2'>Trending Now</h2>
            <div>
                <button onClick={handleLeftArrowBtn} className='text-white text-3xl absolute top-[43%] left-0'><IoIosArrowBack /></button>
                <button onClick={handleRightArrowBtn} className='text-white text-3xl absolute top-[43%] right-0'><IoIosArrowForward /></button>
            </div>
            <div className='flex gap-6 overflow-x-auto scroll-smooth cards' id='cards'>
                {Array(20).fill().map((_, index) => <TrendingSongCard key={index} />)}
            </div>
        </div>
    );
}

export default TrendingSongList;
