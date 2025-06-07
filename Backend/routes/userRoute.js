import express from 'express';
import {Register, Admin, Login} from '../controllers/usercontroller.js';

const userRouter = express.Router();

userRouter.post('/register', Register);
userRouter.post('/login', Login);
userRouter.post('/admin', Admin);

export default userRouter;