import express from 'express'
import { placeorder, razorpayorder, stripepaymentorder, allorders, userorders, updatestatus, verifystripepayment, verifyrazorpay } from '../controllers/ordercontroller.js'
import Adminauth from '../middlewares/adminauth.js';
import userAuth from '../middlewares/userauth.js';

const orderRouter = express.Router();

//Admin orders
orderRouter.post('/allorder', Adminauth, allorders);
orderRouter.post('/update', Adminauth, updatestatus);

//user order data
orderRouter.post('/userorder', userAuth, userorders);


//payment 
orderRouter.post('/place', userAuth, placeorder);
orderRouter.post('/razorpay', userAuth, razorpayorder);
orderRouter.post('/stripepay', userAuth, stripepaymentorder);

//verify payment
orderRouter.post('/verifystripepayment', userAuth, verifystripepayment);
orderRouter.post('/verifyRazorpayment', userAuth, verifyrazorpay);

export default orderRouter;