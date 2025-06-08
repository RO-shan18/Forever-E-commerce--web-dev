import  { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrders = () => {

  const {navigate, cartitems, setcartitems, delivery_fee,totalcartamount, product, login} = useContext(ShopContext);
    const [method, setmethod] = useState('Stripe');

  const [address, setaddress] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const initpay = async(order)=>{
    const options = {
        key : import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount : order.amount,
        currency : order.currency,
        name : 'Order payment',
        description : 'Order payment description',
        order_id : order.id,
        receipt : order.receipt,
        handler : async (response)=>{
          try{
            const  verifyresponse = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/order/verifyRazorpayment', response , {headers:{login}});

            console.log(verifyresponse)

            if(verifyresponse.data.success){
               navigate('/Orders')
               setcartitems({});
            }else{
              navigate('/Cart');
            }
          }catch(error){
             console.log(error);
             toast.error(error.message)
          }
           
        }
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
  }

  const onchangehandler = (event) =>{
     let name = event.target.name;
     let value = event.target.value;

     setaddress(data => ({...data, [name]:value}))
  }

  const onsubmithandler = async(event)=>{
     event.preventDefault();

     if(!address.firstname || !address.lastname || !address.city || !address.email || !address.street || !address.state || !address.zipcode || !address.country || !address.phone){
       toast.error("Fill details first!!")
       return;
     }

     let ordersitem = [];

     for(const items in cartitems){
      for(const item in cartitems[items]){
        if(cartitems[items][item] > 0){
          let iteminfo = structuredClone(product.find((product) => product._id === items));
          iteminfo.size = item;
          iteminfo.quatity = cartitems[items][item];
          ordersitem.push(iteminfo)
        }
      }

    }

    let ordersdata = {
      items : ordersitem,
      address : address,
      amount : totalcartamount() + delivery_fee,
    }

    switch(method){
      
      case "COD":
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/order/place', ordersdata, {headers:{login}});
        if(response.data.success){
          toast.success(response.data.message);
          setcartitems({});
        }else{
          console.log(error);
          toast.error(error.message);
        }
        break;
      
      case "Stripe":
         const responseStripe = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/order/stripepay', ordersdata, {headers:{login}});

         if(responseStripe.data.success){
            const{session_url} = responseStripe.data;
            window.location.replace(session_url);
         }else{
            console.log(responseStripe.data.message)
            toast.error(responseStripe.data.message);
         }
         break;

      case "Razorpay":
          const responserazorpay = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/order/razorpay', ordersdata, {headers: {login}});

          if(responserazorpay.data.success){
              initpay(responserazorpay.data.order)
          }
          
          break;
      
      default:
        break;
    }
      
  }

  return (
    <form onSubmit={onsubmithandler} className='flex lg:justify-between justify-center w-full  sm:w-3/4 mx-auto sm:my-20 my-10 flex-wrap items-center'>
      {/* Left Side */}
      <div className='flex flex-col gap-5 px-4'>
      <Title className="text-xl" title1="DELIVERY" title2="INFORMATION" />
        <div className=' flex gap-3 sm:flex-row flex-col sm:w-full w-screen sm:px-0 px-3'>
          <input onChange={onchangehandler} name='firstname' value={address.firstname} className='border-2 px-3 py-2' type="text" placeholder="First name"/>
          <input onChange={onchangehandler} name='lastname' value={address.lastname} className='border-2 px-3 py-2' type="text" placeholder="Last name"/>
        </div>
        <div className=' flex gap-3 sm:flex-row flex-col sm:w-full w-screen sm:px-0 px-3'>
           <input onChange={onchangehandler} name='email' value={address.email} className='border-2 px-3 py-2 w-full' type="email" placeholder="Email address"/>
        </div>
        <div className=' flex gap-3 sm:flex-row flex-col sm:w-full w-screen sm:px-0 px-3'>
           <input onChange={onchangehandler} name='street' value={address.street} className='border-2 px-3 py-2 w-full' type="text" placeholder="Street"/>
        </div>
        <div className=' flex gap-3 sm:flex-row flex-col sm:w-full w-screen sm:px-0 px-3'>
          <input onChange={onchangehandler} name='city' value={address.city} className='border-2 px-3 py-2' type="text" placeholder="City"/>
          <input onChange={onchangehandler} name='state' value={address.state} className='border-2 px-3 py-2' type="text" placeholder="State"/>
        </div>
        <div className=' flex gap-3 sm:flex-row flex-col sm:w-full w-screen sm:px-0 px-3'>
          <input onChange={onchangehandler} name='zipcode' value={address.zipcode} className='border-2 px-3 py-2' type="number" placeholder="Zipcode"/>
          <input onChange={onchangehandler} name='country' value={address.country} className='border-2 px-3 py-2' type="text" placeholder="Country"/>
        </div>
        <div className=' flex gap-3 sm:flex-row flex-col sm:w-full w-screen sm:px-0 px-3'>
          <input onChange={onchangehandler} name='phone' value={address.phone} className='border-2 px-3 py-2 w-full' type="number" placeholder="Phone"/>
        </div>
      </div>
      {/*Right Side */}
      <div>
        <CartTotal/>

        <div className='flex flex-col sm:px-0 px-4'>
        <Title  title1="PAYMENT" title2="METHODS"/>

        <div className='flex sm:flex-row flex-col gap-4 my-5'>
          <div onClick={()=> setmethod('Stripe')} className='flex gap-4 my-2 sm:my-5 justify-center sm:justify-end  border-2 items-center px-2 py-1 cursor-pointer'>
            <p className={`h-3 w-3 rounded-full ${method === 'Stripe' ? "bg-green-500" : " "}`}></p>
            <img className='w-12 h-6 ' src={assets.stripe_logo}/>
          </div>
          <div onClick={()=> setmethod('Razorpay')} className='flex gap-4 my-2 sm:my-5 justify-center sm:justify-end  border-2 items-center px-2 py-1 cursor-pointer'>
            <p className={`h-3 w-3 rounded-full ${method === 'Razorpay' ? "bg-green-500" : " "}`}></p>
            <img className='w-12 h-6 ' src={assets.razorpay_logo}/>
          </div>
          <div onClick={()=> setmethod('COD')} className='flex gap-4 my-2 sm:my-5 justify-center sm:justify-end  border-2 items-center px-2 py-1 cursor-pointer'>
            <p className={`h-3 w-3 rounded-full ${method === 'COD' ? "bg-green-500" : " "}`}></p>
            <p className='text-sm'>CASH ON DELIVERY</p>
          </div>
        </div>
        <button className='bg-black px-3 py-2 text-sm text-white w-4/6 sm:mx-0 mx-auto sm:w-2/6'>PLACE ORDER</button>
       </div>
      </div>

      
    </form>
  )
}

export default PlaceOrders
