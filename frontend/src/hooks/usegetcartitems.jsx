import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addItem } from '../redux/cartItemSlice';

const usegetcartitems = () => {
    const dispatch = useDispatch();

    //get the cart items from redux store
    const cartItems = useSelector((store)=>  store?.cartItem?.cartitem);

    //get the login token from redux store
    const login = useSelector((store)=> store?.Token?.token);

    let cart = structuredClone(cartItems)

    //getting the cart items when added 
    const getcartitems = async(itemId, size) =>{
    
        if(!size){
            toast.error("Select size first");
            return;
        }

        if(login){
            try{
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/cart/add', {itemId, size}, {headers : {login}});
            
            if(response.data.success){
                toast.success(response.data.message);
            }
            else{
                 toast.success(response.data.message)
            }
           

            }catch(error){
                console.log(error)
                toast.error(error.message);
            }
           
        }else{
            toast.error("Not Authorized Login again")
            return;
        }

        if(cart[itemId]){
            if(cart[itemId][size]){
                cart[itemId][size] += 1;
            }else{
                cart[itemId][size] = 1;
            }
        }else{
            cart[itemId] = {};
            cart[itemId][size] = 1;
        }
        dispatch(addItem(cart));
    }

    return {getcartitems};

}

export default usegetcartitems
