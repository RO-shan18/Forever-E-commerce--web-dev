import React from 'react'

const Title = ({title1, title2}) => {
  return (
    <div className='flex items-center gap-3 mx-3'>
       <p className='text-gray-700 lg:text-2xl md:text-xl sm:text-lg'>{title1} <span className='text-black'>{title2}</span></p>
       <p className='w-12 h-[1.3px] bg-black'></p>
    </div>
  )
}

export default Title
