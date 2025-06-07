import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex md:flex-row flex-col justify-evenly items-center my-20'>
       <div className='flex flex-col items-center md:pt-2 pt-5'>
            <img className='w-8' src={assets.exchange_icon} alt="exchangepolicy"/>
            <p className='text-black text-sm md:text-md text-center'>Easy Exchange Policy</p>
            <p className='text-gray-700 text-sm md:text-md text-center'>We offer hassle free  exchange policy</p>
       </div>
       <div className='flex flex-col items-center md:pt-2 pt-5'>
            <img className='w-8' src={assets.quality_icon} alt="returnpolicy"/>
            <p className='text-blacktext-sm md:text-md text-center'>7 Days Return Policy</p>
            <p className='text-gray-700 text-sm md:text-md text-center'>We provide 7 days free return policy </p>
       </div>
       <div className='flex flex-col items-center md:pt-2 pt-5'>
            <img className='w-8' src={assets.support_img} alt="customersupport"/>
            <p className='text-black text-sm md:text-md text-center'>Best Customer Support</p>
            <p className='text-gray-700 text-sm md:text-md text-center'>We provide 24/7 customer support</p>
       </div>
    </div>
  )
}

export default OurPolicy
