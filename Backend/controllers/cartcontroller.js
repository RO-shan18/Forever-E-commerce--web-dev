import usermodel from "../models/usermodel.js";

const addcart = async(req, res)=>{
    try{
        const {userId, itemId, size } = req.body;

        const userdata = await usermodel.findById(userId);
        const cartdata = await userdata.cartdata;

        if(cartdata[itemId]){
            if(cartdata[itemId][size]){
                cartdata[itemId][size] += 1;
            }else{
                cartdata[itemId][size] = 1
            }
        }else{
            cartdata[itemId] = {};
            cartdata[itemId][size] = 1;
        }

        await usermodel.findByIdAndUpdate(userId, {cartdata});

        res.json({success:true, message:'Added to the cart'});

    }catch(error){
         res.json({success:false, message:error.message});
    }
}

const updatecart = async(req, res)=>{

    try{
        const{userId, itemId, size, quantity} = req.body;

        const userdata = await usermodel.findById(userId);
        const cartdata = await userdata.cartdata;

        cartdata[itemId][size] = quantity;

        await usermodel.findByIdAndUpdate(userId, {cartdata});

        res.json({success:true, message:'cart updated'});

    }catch(error){
        res.json({success:false, message:error.message});
    }

}

const getcart = async(req, res)=>{

    try{

        const {userId} = req.body;

        const userdata = await usermodel.findById(userId);
        const cartdata = await userdata.cartdata;

        res.json({success : true, message : cartdata});

    }catch(error){
        res.json({success:false, message:error.message});
    }

}

export { addcart, updatecart, getcart };