import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addproduct } from "../redux/productsstlice";
import axios from "axios";
import { toast } from "react-toastify";

const usegetproducts = () => {

    const dispatch = useDispatch();

    //get products from the backend
    const getproducts = async ()=>{
        try{
            const response = await axios.get( import.meta.env.VITE_BACKEND_URL + '/api/product/list');

            if(response.data.success){
                dispatch(addproduct(response.data.message));
            }else{
                toast.error(response.data.message)
            }
            
        }catch(error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getproducts();
    },[])
}

export default usegetproducts;
