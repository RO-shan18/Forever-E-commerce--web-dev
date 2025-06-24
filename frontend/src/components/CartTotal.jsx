import { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../Context/ShopContext'
import { useSelector } from 'react-redux';

const CartTotal = () => {
   
    //get the currency symbol from redux store
    const currency = useSelector((store)=> store.Utility.currency);

    //get the currency symbol from redux store
    const delivery_fee = useSelector((store)=> store.Utility.delivery_fee);

    const { totalcartamount } = useContext(ShopContext)

  return (
    <div className='flex lg:px-0 px-7 w-full  flex-col justify-self-end my-20'>
       <Title  title1="CART" title2="TOTALS" />
       <div className='flex flex-col  gap-8 text-gray-700 my-3'>
           <div className='flex justify-between'>
              <p>SubTotal</p>
              <p>{currency}{totalcartamount()}</p>
           </div>
           <div className='flex justify-between'>
              <p>Shipping Free</p>
              <p>{currency}{delivery_fee}</p>
           </div>
           <div className='flex justify-between'>
              <p className='font-semibold text-black'>Total</p>
              <p>{currency}{totalcartamount() + delivery_fee}</p>
           </div>
       </div>
    </div>
  )
}

export default CartTotal
