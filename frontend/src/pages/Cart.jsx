import { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useUpdatequantity from '../hooks/useUpdatequantity';

const Cart = () => {

  //get the cart items from redux store
  const cartItems = useSelector((store)=>  store?.cartItem?.cartitem);

  //get the products from redux store
  const productitems = useSelector((store)=> store?.products?.getproducts);

  //get the currency symbol from redux store
  const currency = useSelector((store)=> store.Utility.currency);

  //custom hook 
  const {updatequantity} = useUpdatequantity();

  const navigate = useNavigate();

  const [cartdata, setcartdata ] = useState();

  const cartinfo = async()=>{
     let tempdata = [];

     for(const items in cartItems){
      for(const item in cartItems[items]){
         if(cartItems[items][item] > 0){
            tempdata.push({
              id : items,
              quantity : cartItems[items][item],
              size : item,
            })
         }
      }
     }

     setcartdata(tempdata);
  }

  useEffect(()=>{
    cartinfo()
  },[cartItems])


  return (
    <div className='lg:my-20 my-10 w-full px-10 lg:w-3/4 mx-auto'>
       <Title  title1="YOUR" title2="CART" />

       <div className='flex flex-col gap-3 '>
          { cartdata && 
            cartdata.map((item, index)=>{
               
               let productdata
               if(productitems.length > 0)
               productdata = productitems[0].find((product)=> product._id === item.id);

               return(
                <div className='sm:grid flex my-3 sm:py-0 py-4 flex-col items-center justify-center grid-cols-[1fr_3fr_3fr_1fr] gap-5 border-2' key={index}>
                   <div className='w-48 sm:w-32'>
                     <img src={productdata?.image[0]} alt="productimage"/>
                   </div>
                   <div className='flex flex-col gap-5'>
                     <h1 className=' lg:text-xl md:text-lg sm:text-md text-sm font-semibold'>{productdata?.name}</h1>
                     <div className='flex gap-4 items-center sm:justify-start justify-center'>
                       <p className='lg:text-xl md:text-lg sm:text-md text-sm'>{currency}{productdata?.price}</p>
                       <p className='lg:text-xl md:text-lg sm:text-md text-sm border-2 px-2'>{item.size}</p>
                     </div>
                   </div>
                   <div className='flex sm:justify-start justify-center'>
                      <input onChange={(e)=> e.target.value === ' ' || e.target.value === "0" ? null : updatequantity(item.id, item.size, Number(e.target.value))} type="number" className='border-2 px-4 w-3/4' min={1} defaultValue={item.quantity} />
                   </div>
                   <div >
                      <img onClick={()=>updatequantity(item.id, item.size, 0)} className='w-4 md:w-6' src={assets.bin_icon} alt="deleteicon"/>
                   </div>
                </div>
               )
            })
          }
       </div>

       <div>
         <CartTotal />
         <div className='flex sm:justify-between justify-center'>
             <p></p>
             <button  onClick={()=> navigate('/PlaceOrder')} className='bg-black sm:px-4 sm:py-3 px-2 py-1  text-white sm:text-lg text-sm'>Proceed to checkout</button>
           </div>
       </div>
    </div>
  )
}

export default Cart
