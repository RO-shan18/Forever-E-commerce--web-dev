import axios from 'axios';
import { toast } from 'react-toastify';
import { addItem } from '../redux/cartItemSlice';
import { useDispatch, useSelector } from 'react-redux';
import { gettoken } from '../redux/loginslice';
import { useEffect } from 'react';

const usegetusecartdata = () => {

  const dispatch = useDispatch();
  
  //get the login token from redux store
  const login = useSelector((store)=> store?.Token?.token);

  //get usercartdata from the database
  const getusercartdata = async(login)=>{

      try{
            
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/cart/get', {}, {headers:{login}});
          if(response.data.success){
               dispatch(addItem(response.data.message))
          }

        }catch(error){
            console.log(error)
            toast.error(error.message) 
        }
   }

   useEffect(()=>{
        if(!login && localStorage.getItem('token')){
            dispatch(gettoken((localStorage.getItem('token'))));
            getusercartdata(localStorage.getItem('token'))
        }
    })

   return {getusercartdata}
}

export default usegetusecartdata
