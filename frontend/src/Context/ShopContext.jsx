import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

 

const ShopContext = createContext();

const ShopContextProvider = (props)=>{

    const currency = '$';
    const delivery_fee = 10;
    const [search, setsearch] = useState("");
    const [product, setproduct] = useState([]);
    const [showsearch, setshowsearch] = useState(false);
    const [cartitems, setcartitems] = useState({});
    const [login, setlogin] = useState('');
    const navigate = useNavigate();

    //getting the cart items when added 
    const getcartitems = async(itemId, size) =>{
        let cart = structuredClone(cartitems)

        if(!size){
            toast.error("Select size first");
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

        setcartitems(cart);

        if(login){
            try{
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/cart/add', {itemId, size}, {headers : {login}});
            
            if(response.data.success)
            toast.success(response.data.message);

            }catch(error){
                console.log(error)
                toast.error(error.message);
            }
           
        }
    }

    //updated the count when added to the cart
    const countcartitems = () =>{
        let cartitemcount = 0;
        for(const items in cartitems){
            for(const size in cartitems[items]){
                if(cartitems[items][size] > 0){
                    cartitemcount += cartitems[items][size];
                }
            }
        }

        return cartitemcount;
    }

    //update quantity when increase
    const updatequantity = async(itemId, size, quantity)=>{
        let updatedata = structuredClone(cartitems);

        updatedata[itemId][size] = quantity;

        setcartitems(updatedata);

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

    //total amount of the products
    const totalcartamount = ()=>{
       let totalamount = 0;
       
       for(const items in cartitems){
         let productsinfo = product.find((product)=> product._id === items);
         
         for(const item in cartitems[items]){
            if(cartitems[items][item] > 0)
            totalamount += productsinfo?.price * cartitems[items][item];
         }
       }

       return totalamount;
    }

    //get products from the backend
    const getproducts = async ()=>{
        try{
            const response = await axios.get( import.meta.env.VITE_BACKEND_URL + '/api/product/list');
            
            if(response.data.success){
                setproduct(response.data.message)
            }else{
                toast.error(response.data.message)
            }
            
        }catch(error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    //get usercartdata from the database
    const getusercartdata = async(login)=>{

        try{
            
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/cart/get', {}, {headers:{login}});
            if(response.data.success){
                setcartitems(response.data.message);
            }

        }catch(error){
            console.log(error)
            toast.error(error.message) 
        }
    }

    useEffect(()=>{
        getproducts();
    },[])

    useEffect(()=>{
        if(!login && localStorage.getItem('token')){
            setlogin(localStorage.getItem('token'));
            getusercartdata(localStorage.getItem('token'))
        }
    })


    const value = {
        product, setproduct, currency, delivery_fee,
        search, setsearch, showsearch, setshowsearch,
        cartitems, getcartitems, setcartitems,
        countcartitems,updatequantity,
        totalcartamount,navigate,
        login, setlogin,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export {ShopContext, ShopContextProvider};