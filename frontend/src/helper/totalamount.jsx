import { useSelector } from 'react-redux';

const totalamount = () => {
    //get the products from redux store
    const productitems = useSelector((store)=> store?.products?.getproducts);
    
    //get the cart items from redux store
    const cartItems = useSelector((store)=>  store?.cartItem?.cartitem);

    //total amount of the products
    const totalcartamount = ()=>{
       let totalamount = 0;
       
       for(const items in cartItems){
         let productsinfo;

         if(productitems.length > 0)
          productsinfo = productitems[0].find((product)=> product._id === items);
         
         for(const item in cartItems[items]){
            if(cartItems[items][item] > 0)
            totalamount += productsinfo?.price * cartItems[items][item];
         }
       }

       return totalamount;
    }

    return {totalcartamount}
}

export default totalamount
