import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../Context/ShopContext'
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
    const {search, setsearch, showsearch, setshowsearch} = useContext(ShopContext);
    const [visible, setvisible] = useState(false);

    const location = useLocation();

    useEffect(()=>{
        if(location.pathname === '/Collection'){
            setvisible(true);
        }else{
            setvisible(false);
        }
    },[location])

  return visible && (
    <div className={`py-8 bg-slate-100 ${showsearch ? "hidden" : "block"}`}>
        <div className='flex justify-center gap-6 items-center'>
            <input  type="search" placeholder="Enter here..." value={search} onChange={e=> setsearch(e.target.value)} className='w-2/4 rounded-3xl border-2 px-6 py-3'/>
            <img className='w-4' src={assets.search_icon} alt='searchbar'/>
            <img onClick={()=> setshowsearch(true)} className='w-4' src={assets.cross_icon} alt='crossicon' />
        </div>
    </div>
  ) 
}

export default Searchbar
