import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BackendUrl } from '../App';
import { assets } from '../assets/admin_assets/assets';
import { toast } from 'react-toastify';

const List = ({login}) => {
  const [lists, setlists] = useState();

  const listproducts = async ()=>{
     try{
       
       const response = await axios.get(BackendUrl + '/api/product/list');

       if(response.data.success){
          setlists(response.data.message);
       }else{
          toast.error("No Products available..")
       }

     }catch(error){
          console.log(error)
          toast.error(error.message)
     }
  }

  const removeproduct = async(id)=>{
     try{
        
        const response = await axios.post(BackendUrl + '/api/product/remove' , {id} , {headers: {login}});

        if(response.data.success){
           toast.success(response.data.message)
           listproducts();
        }else{
           toast.error(response.data.message)
        }
     }catch(error){
          console.log(error)
          toast.error(response.data.message)
     }
  }

  useEffect(()=>{
    listproducts();
  },[])


  return (
    <div>
      <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-3 border-2 px-2 py-1 bg-gray-100 mx-10  my-4 font-semibold w-[100vw]'>
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>
      <div className='border-2 mx-10 my-4 overflow-scroll scrollbar-hide h-[80vh] '>
         {lists && 
          lists.map((item)=>{
            return (<div key={item._id} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr]  gap-3  px-2 py-1 items-center'>
               <img className='w-12' src={item.image[0]} alt="productimage" />
               <p className='text-gray-700 text-xs sm:text-lg'>{item.name}</p>
               <p className='text-gray-700 text-xs sm:text-lg'>{item.category}</p>
               <p className='text-gray-700 text-xs sm:text-lg'>{item.price}</p>
               <img className='w-3 ' onClick={()=>removeproduct(item._id)} src={assets.cross_icon} alt="crossicon" />
            </div>)
          })
         }
      </div>
      
    </div>
  )
}

export default List
