import  { useContext, useEffect, useState } from "react";
import {  ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { gettoken } from "../redux/loginslice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  //get the login token from redux store
  const login = useSelector((store)=> store?.Token?.token);

  const navigate = useNavigate();

  const [signup, setsignup] = useState("Login");

  const[name, setname] = useState('');
  const[email, setemail] = useState('');
  const[password, setpassword] = useState('');

  const onsubmithandler = async(event)=>{
     event.preventDefault();

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

  useEffect(()=>{
    if(login)
    navigate('/');
  },[login])



  return (
    <div className="my-20 flex justify-center ">
      <div className="text-center">
        <h1 className="prata-regular text-2xl">{signup}</h1>

      <form onSubmit={onsubmithandler} className="flex flex-col gap-4 my-3">
        {signup === 'Sign Up' && 
        <div>
          <input value={name} onChange={(e)=>setname(e.target.value)} className="border-2 px-2 py-2 w-60 sm:w-96" type="text" placeholder="Name" />
        </div>}
        <div>
          <input value={email} onChange={(e)=>setemail(e.target.value)} className="border-2 px-2 py-2 w-60 sm:w-96" type="email" placeholder="Email" />
        </div>
        <div>
          <input value={password} onChange={(e)=>setpassword(e.target.value)} className="border-2 px-2 py-2 w-60 sm:w-96" type="password" placeholder="Password" />
        </div >
       {signup === 'Login' && <div className="flex justify-between text-xs sm:text-sm text-gray-700">
          <p className="cursor-pointer">Forgot your password?</p>
          <p className="cursor-pointer" onClick={()=> setsignup('Sign Up')}>Create account</p>
        </div>}
        <div className="flex justify-center">
            <button className="bg-black text-white p-2  w-2/4">{signup}</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Login;
