import Title from '../components/Title'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useOrder from '../hooks/useOrder';

const Orders = () => {
   //get the login token from redux store
   const login = useSelector((store)=> store?.Token?.token);

   //get the currency symbol from redux store
   const currency = useSelector((store)=> store.Utility.currency);

   //custom hook 
   const {ordersdata, userorderdetail} = useOrder();

  useEffect(()=>{
    userorderdetail();
  },[login]);
  
  return (
    <div className='sm:my-20 my-10 w-full lg:px-0 px-5 lg:w-3/4 mx-auto flex flex-col gap-5 '>
      <Title title1="MY" title2="ORDERS"/>
     { ordersdata &&
       ordersdata.map((product , index)=>{
        return <div key={index} className='flex flex-col sm:items-start  items-center sm:grid grid-cols-[1fr_2fr_1fr_1fr] lg:grid-cols-[1fr_2fr_3fr_1fr] gap-4 border-2 p-3'>
            <img className='w-48' src={product.image[0]}/>
            <div className='flex flex-col lg:gap-3 md:gap-5 gap-1 sm:items-start items-center'>
              <p className='font-semibold text-lg'>{product.name}</p>
              <div className='flex gap-3 text-sm '>
                <p>{currency}{product.price}</p>
                <p>Quantity: {product.quatity}</p>
                <p>Size: {product.size}</p>
              </div>
              <p className='text-sm'>Date:{new Date(Number(product.date)).toDateString()}</p>
              <p className='text-sm'>Payment:{product.PaymentMethod}</p>
            </div>
            <div className='flex gap-3 justify-center items-center px-3'>
              <p className='h-3 w-3 rounded-full bg-green-500'></p>
              <p className='text-sm'>{product.status}</p>
            </div>
            <div className='flex gap-3 justify-center items-center'>
            <button onClick={userorderdetail} className=' text-sm border-2 px-3 py-1'>Track Order</button>
            </div>
          </div>
     })}
    </div>
  )
}

export default Orders
