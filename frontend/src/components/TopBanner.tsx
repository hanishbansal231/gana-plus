import React from 'react'

const TopBanner:React.FC = () => {
    return (
        <div className=' flex justify-center items-center'>
            <div className='flex gap-5 w-full'>
                <img className=' w-[60%] h-[200px]' src="https://aimg.jiocinema.com/o0VSqW4M5f9KPf8y_lwdcwxi7_zymhqph_nlopu9tpswawhrsl.jpg?width=1800" alt="" />
                <img className=' w-[40%] h-[200px]' src="https://a10.gaanacdn.com/gn_img/showcase/g4w3vr3jJB/g4w3vzo3jJ/size_l_1712748987.webp" alt="" />
            </div>
        </div>
    )
}

export default TopBanner