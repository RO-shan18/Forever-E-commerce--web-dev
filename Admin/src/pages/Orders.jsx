import axios from "axios";
import { useState } from "react";
import { BackendUrl } from "../App";
import { useEffect } from "react";
import { assets } from "../assets/admin_assets/assets";
import { toast } from "react-toastify";

const Orders = ({ login }) => {
  const [orders, setorders] = useState([]);

  const getallorders = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/order/allorder",
        {},
        { headers: { login } }
      );
      console.log(response.data.message);
      if (response.data.success) {
        setorders(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.error.message);
    }
  };

  const updatestatus = async ( id, event )=>{
    try{

      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/order/update', { id, status:event.target.value }, {headers:{login}});

      console.log(response)
      if(response.data.success){
         await getallorders();
         toast.success(response.data.message);
      }
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getallorders();
  }, []);

  return (
    <div className="flex flex-col gap-3 my-10 w-11/12 lg:w-9/12 mx-auto lg:text-lg md:text-sm text-xs">
      <p className="text-gray-700 pb-4">Orders page</p> 
      {orders.map((order, index) => {
        return (
          <div key={order._id} className="flex flex-col sm:grid grid-cols-[0.5fr_1.7fr_1fr_0.5fr_1fr] gap-7 md:gap-3 text-gray-700 border-2 px-5  py-8">
             <div >
                <img src={assets.parcel_icon} alt="orderimage"/>
             </div>

             <div className="grid grid-cols-[2fr_1fr_2fr] sm:block">
              <div >
              {
                order.items.map((item, index)=>{
                   return <p key={index}>{item.name}</p>
                })
              }
              </div>

              <p>{order.address.firstname} {order.address.lastname}</p>
              <div>
                <p>{order.address.street}</p>
                <p>{order.address.zipcode}</p> 
                <p>{order.address.phone}</p> 
                </div>
             </div>

             <div className="grid grid-cols-[2fr_1fr_2fr] sm:block">
                  <p>Items : {order.items.length}</p>
                  <div>
                    <p>Method : {order.PaymentMethod}</p>
                    <p>Payment : {`${order.Payment === false ? "Pending" : "Completed"}`}</p>
                    <p>Date: {new Date(Number(order.date)).toDateString()}</p>
                  </div>
             </div>

             <div className="grid grid-cols-[6fr_1fr] sm:block">
                <p>${order?.items[0]?.price}</p>
             </div>

             <div className> 
                <select onChange={(event)=> updatestatus(order._id, event)} value={order.status}  className="py-2 px-3 border-2">
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shifted">Shifted</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
             </div>

          </div>
        )
      })}
    </div>
  );
};

export default Orders;
