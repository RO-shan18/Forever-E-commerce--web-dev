import React, { useState } from 'react'
import { BackendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({setlogin}) => {
    const [email, setemail] = useState('');
    const [password, setpassword]  = useState('');

    const onsubmithandler = async (event)=>{
        try{
            event.preventDefault();

            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/admin',{email, password});

            if(response.data.success){
                setlogin(response.data.message);
            }else{
                toast.success('Logged in successfully');
            }
        }catch(error){
            toast.error(error.message);
        }
    }
  return (
    <div  className='w-full h-[100vh] bg-gray-200 py-20'>
        <form onSubmit={onsubmithandler} className='flex justify-center flex-col text-lg items-center gap-5 border-2 px-4 py-10 rounded-lg w-1/4 mx-auto bg-white'>
            <h1 className='text-gray-700 text-xl font-semibold'>ADMIN LOGIN</h1>

            <div>
                <input className='border-2 p-2 w-80' value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="Enter Email here...."/>
            </div>

            <div>
                <input className='border-2 p-2 w-80' value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Enter password here...."/>
            </div>

            <div className='px-6 py-2 bg-black rounded-lg text-white mt-3'>
                <input type="submit" value="Login"/>
            </div>
        </form>
    </div>
  )
}

export default Login;
