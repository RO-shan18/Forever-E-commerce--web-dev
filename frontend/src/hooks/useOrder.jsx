import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useOrder = () => {

 const [ordersdata, setordersdata] = useState();

 //get the login token from redux store
 const login = useSelector((store)=> store?.Token?.token);

 const userorderdetail = async()=>{
     try{

        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/order/userorder', {}, {headers : {login}});
        const orderitems = [];
        if(response.data.success){
           const items = response.data.message

          items.map((item)=>{
              item.items.map((order)=>{
                 order['status'] = item.status;
                 order['Payment'] = item.Payment;
                 order['PaymentMethod'] = item.PaymentMethod;
                 order['date'] = item.date;
                 orderitems.push(order)
              })
           })
          setordersdata(orderitems.reverse());
        }

     }catch(error){
        console.log(error);
        toast.error(error.message);
     }
  }

  return {userorderdetail, ordersdata}

}

export default useOrder
