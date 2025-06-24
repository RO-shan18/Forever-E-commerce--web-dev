import  { useEffect, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { togglesearch } from '../redux/showsearchslice';
import { searchresult } from '../redux/searchvalueslice';

const Searchbar = () => {
    const dispatch = useDispatch();
    const search = useSelector((store)=> store?.Search?.search)
    const showsearch = useSelector((store)=> store?.showSearch?.showsearch)
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
            <input  type="search" placeholder="Enter here..." value={search} onChange={e=> dispatch(searchresult(e.target.value))} className='w-2/4 rounded-3xl border-2 px-6 py-3'/>
            <img className='w-4' src={assets.search_icon} alt='searchbar'/>
            <img onClick={()=> dispatch(togglesearch(true))} className='w-4' src={assets.cross_icon} alt='crossicon' />
        </div>
    </div>
  ) 
}

export default Searchbar
