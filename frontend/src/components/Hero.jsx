import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
  return (
    <div className='flex md:flex-row flex-col items-center w-3/4 border-2 mx-auto justify-between'>
      {/* left section */}
      <div className='flex flex-col justify-center items-center text-[#414141]  w-[100%] md:py-0 py-12'>
        <div className='flex lg:gap-3 gap-1 items-center pb-1 justify-center  w-[100%]'>
            <p className='lg:w-12 w-8 h-[1.3px] bg-slate-700'></p>
            <p className='lg:text-lg text-md'>OUR BESTSELLERS</p>
        </div>
        <h1 className='lg:text-5xl text-3xl prata-regular w-[100%] text-center'>Latest Arrivals</h1>
        <div className='flex lg:gap-3 gap-1 items-center pt-2 justify-center w-[100%]'>
            <p className='lg:text-lg text-md'>SHOP NOW</p>
            <p className='lg:w-12 w-8 h-[1.3px] bg-slate-700'></p>
        </div>
      </div>
      {/* Right section */}
     
      <div>
        <img src={assets.hero_img} alt="Herosectionimage" />
      </div>
    </div>
  )
}

export default Hero
