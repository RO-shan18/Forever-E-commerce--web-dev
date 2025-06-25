import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { gettoken } from '../redux/loginslice';

const useLogin = () => {
  const dispatch = useDispatch();

  const authenticateuser = async(name, email, password, signup)=>{
     try{
      if(signup === 'Sign Up'){
        //Register User
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/register', {name, email, password});
        
        if(response.data.success){
           localStorage.setItem('token', response.data.token);
           dispatch(gettoken((response.data.token)));
        }else{
          toast.error(response.data.message)
        }
        
      }else{
        //Login User
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/login' , {email, password});
        if(response.data.success){
          localStorage.setItem('token', response.data.token);
          dispatch(gettoken((response.data.token)));
          toast.success('Login successfully')
        }else{
          toast.error(response.data.message)
        }
      }

    }catch(error){
        console.log(error)
        toast.error(error.message);
    }
  }
 
  return {authenticateuser};
}

export default useLogin
