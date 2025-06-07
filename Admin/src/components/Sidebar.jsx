import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";
import { useState } from "react";

const Sidebar = ({sidebar}) => {
  return (
    <div className={`flex absolute bg-white flex-col gap-6 px-5 py-6 h-[90vh] border-2 ${!sidebar && 'hidden'} `}>
        <NavLink to='/add' className='flex gap-3 text-gray-700 border-2 px-3 py-2 rounded-sm'>
            <img src={assets.add_icon} alt="addproducts"/>
            <p>Add products</p>
        </NavLink>
        <NavLink to='/list' className='flex gap-3 text-gray-700 border-2 px-3 py-1 rounded-sm'> 
            <img src={assets.order_icon} alt="lists"/>
            <p>Lists products</p>
        </NavLink>
        <NavLink to='/order' className='flex gap-3 text-gray-700 border-2 px-3 py-1 rounded-sm'>
            <img src={assets.order_icon} alt="orders"/>
            <p>Orders products</p>
        </NavLink>
    </div>
    )
}

export default Sidebar
