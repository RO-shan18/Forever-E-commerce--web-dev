import express from 'express';
import {addproduct, removeproduct, listproducts, singleproduct} from '../controllers/productcontroller.js';
import upload from '../middlewares/multer.js';
import Adminauth from '../middlewares/adminauth.js';

const productRouter = express.Router();

productRouter.post('/add', Adminauth ,upload.fields([{name: "image1" , maxCount : 1},{name: "image2" , maxCount : 1},{name: "image3" , maxCount : 1},{name: "image4" , maxCount : 1}]), addproduct);
productRouter.post('/remove', Adminauth, removeproduct);
productRouter.post('/single', singleproduct);
productRouter.get('/list', listproducts);

export default productRouter;
