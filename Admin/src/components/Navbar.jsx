import React from 'react'
import {assets} from '../assets/admin_assets/assets.js'

const  Navbar = ({setlogin, setopensidebar, sidebar}) => {
  return (
    <div className='flex justify-between items-center gap-5 px-4 md:px-10 pb-3'>
      <div className='flex gap-7 items-center'>
        <div onClick={()=> setopensidebar(!sidebar)} >
            <img className='w-6' src={assets.menu_icon} alt="menuicon" />
        </div>
        <div className='w-48'>
            <img src={assets.logo} alt="navbar"/>
        </div>
      </div>
        <div className='bg-pink-400 px-4 py-1 text-xl rounded-lg text-white font-semibold'>
            <button onClick={()=> setlogin('') }>Logout</button>
        </div>
    </div>
  )
}

export default Navbar
