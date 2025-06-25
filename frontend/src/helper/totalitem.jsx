import { useSelector } from "react-redux";

const totalitem = () => {
    //get the cart items from redux store
    const cartItems = useSelector((store)=>  store?.cartItem?.cartitem);

    //updated the count when added to the cart
    const countcartitems = () =>{
        let cartitemcount = 0;
        for(const items in cartItems){
            for(const size in cartItems[items]){
                if(cartItems[items][size] > 0){
                    cartitemcount += cartItems[items][size];
                }
            }
        }

        return cartitemcount;
    }

    return {countcartitems}
}

export default totalitem
