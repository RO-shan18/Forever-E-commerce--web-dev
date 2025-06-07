import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";
import Stripe from 'stripe'
import Razorpay from 'razorpay';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayinstance = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})

const currency = 'inr';
const deliverycharge = 10;

const placeorder = async(req, res)=>{
    try{
        const { userId, items, address, amount } = req.body;

        const orderdata = {
            userId, 
            items,
            address,
            amount,
            PaymentMethod : "COD",
            Payment : false,
            date : Date.now(),
        }

        const orders = new ordermodel(orderdata);

        await orders.save();

        const userdata = await usermodel.findByIdAndUpdate(userId, {cartdata:{}});
        
        res.json({success:true, message:"Order Placed"});

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

const razorpayorder = async(req, res)=>{
    try{
       const { userId, items, address, amount } = req.body;

        const orderdata = {
            userId, 
            items,
            address,
            amount,
            PaymentMethod : "Razorpay",
            Payment : false,
            date : Date.now(),
        }

        const orders = new ordermodel(orderdata);

        await orders.save();

        //options
        const options = {
            amount : amount*100,
            currency : currency.toUpperCase(),
            receipt : orders._id.toString(),
        }

        await razorpayinstance.orders.create(options, (error, order)=>{
            if(error){
                console.log(error);
                return res.json({success:false, message:error})
            }else{
                return res.json({success:true, order})
            }
        })

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

const verifyrazorpay = async(req, res)=>{
    try{
        const { userId, razorpay_order_id } = req.body;

        console.log(razorpay_order_id);

        const orderinfo = await razorpayinstance.orders.fetch(razorpay_order_id);
        console.log(orderinfo)
        if(orderinfo.status === 'paid'){
            await ordermodel.findByIdAndUpdate(orderinfo.receipt , {Payment : true});
            await usermodel.findByIdAndUpdate(userId, {cartdata: {}});

            res.json({success: true, message : "Payment successful"});
        }else{
            res.json({success:false, message: "Payment failed"});
        }
    }catch(error){
        res.json({success:false, message:error.message})
    }
}

const stripepaymentorder = async(req, res)=>{
    try{

        const { userId, items, address, amount } = req.body;
        const { origin } = req.headers;

        const orderdata = {
            userId, 
            items,
            address,
            amount,
            PaymentMethod : "Stripe",
            Payment : false,
            date : Date.now(),
        }

        const orders = new ordermodel(orderdata);

        await orders.save();

        //create line items
        const line_items = items.map((item)=>({
            price_data : {
                currency : currency,
                product_data: {
                    name : item.name
                },
                unit_amount : item.price * 100,
            },
            quantity : item.quatity,
        }))

        line_items.push({
            price_data : {
                currency : currency,
                product_data: {
                    name : 'Delivery_Charges'
                },
                unit_amount : deliverycharge,
            },
            quantity : 1,
        })

        const session = await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success=true&orderId=${orders._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${orders._id}`,
            line_items,
            mode : 'payment',
        })

        res.json({success:true, session_url:session.url});


    }catch(error){
         res.json({success:false, message:error.message})
    }
}

//verify stripe payment
const verifystripepayment = async(req, res)=>{
    try{

        const {orderId, userId, success } = req.body;

        if(success === 'true'){
            await ordermodel.findByIdAndUpdate(orderId, {Payment : true});

            await usermodel.findByIdAndUpdate(userId, {cartdata: {}});

            res.json({success:true});

        }else{
            ordermodel.findByIdAndDelete(orderId);

            res.json({success:false});
        }

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

const allorders = async(req, res)=>{
    try{
    
      const orders = await ordermodel.find({});
      res.json({success:true, message:orders});

    }catch(error){
       res.json({success:false, message:error.message})
    }
}

const userorders = async(req, res)=>{
    try{
        const { userId } = req.body;

        const orderdata = await ordermodel.find({userId});

        res.json({success:true, message:orderdata});

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

const updatestatus = async(req, res)=>{
    try{

        const {id, status} = req.body;

         await ordermodel.findByIdAndUpdate(id, {status});

        res.json({success:true, message:"Status updated"});

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

export {verifyrazorpay,  verifystripepayment,  placeorder, razorpayorder, stripepaymentorder, allorders, userorders, updatestatus};