import { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../redux/cartItemSlice';

const Verify = () => {
    const navigate = useNavigate();

    //get the login token from redux store
    const login = useSelector((store)=> store?.Token?.token);

    const dispatch = useDispatch();

    const [searchparams, setsearchparams] = useSearchParams();

    const success = searchparams.get('success');
    const orderId = searchparams.get('orderId');

    const verifypayment = async()=>{
        try{

            if(!login){
                return null;
            }

            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/order/verifystripepayment', {success, orderId}, {headers : {login}});

            console.log(response)

            if(response.data.success){
                dispatch(removeItem());
                navigate('/Orders')
            }else{
                navigate('/Cart');
            }

        }catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        verifypayment();
    },[login])

  return (
    <div>
       
    </div>
  )
}

export default Verify
