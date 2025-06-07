import express from 'express';
import { addcart, updatecart, getcart } from '../controllers/cartcontroller.js';
import userRouter from './userRoute.js';
import userAuth from '../middlewares/userauth.js';

const cartRouter = express.Router();

cartRouter.post('/add',userAuth, addcart);
cartRouter.post('/update',userAuth, updatecart);
cartRouter.post('/get',userAuth, getcart);

export default cartRouter;
