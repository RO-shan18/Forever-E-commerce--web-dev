import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from '../redux/cartItemSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const useUpdatequantity = () => {
  const dispatch = useDispatch();
  //get the cart items from redux store
  const cartItems = useSelector((store)=>  store?.cartItem?.cartitem);

  //get the login token from redux store
  const login = useSelector((store)=> store?.Token?.token);

  //update quantity when increase
  const updatequantity = async(itemId, size, quantity)=>{
      let updatedata = structuredClone(cartItems);

      updatedata[itemId][size] = quantity;

      dispatch(updateItem(updatedata));

        if(login){

            try{    
                
                const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/cart/update', {itemId, size, quantity}, {headers:{login}})

                if(response.data.success){
                    toast.success(response.data.message);
                }
                
            }catch(error){
                console.log(error)
                toast.error(error.message);
            }
        }
    }

  return {updatequantity}
}

export default useUpdatequantity
