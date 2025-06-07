import {v2 as cloudinary} from 'cloudinary';
import productmodel from '../models/productmodel.js';

const addproduct = async (req, res)=>{
    try{
    const {name, description, price, category, subCategory, sizes, bestseller} = req.body;    

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1,image2,image3,image4].filter((item)=> item !== undefined);

    const imageUrl = await Promise.all(
        images.map(async (item)=> {
            let result = await cloudinary.uploader.upload(item.path, {resource_type : 'image'});
            return result.secure_url;
        })
    )

    const productdata = {
        name,
        description,
        price, 
        category,
        subCategory,
        sizes: JSON.parse(sizes),
        bestseller: bestseller === "true" ? true : false,
        image:imageUrl,
        date:Date.now(),
    }

    const product = new productmodel(productdata);

    await product.save();

    res.json({success:true, message:"Product Added"});
    }catch(error){
        res.json({success:false, message:error.message})
    }
    }
   

const removeproduct = async (req, res)=>{
     try{
        const removed = await productmodel.findByIdAndDelete(req.body.id);

        res.json({success:true, message:"Product removed"});

     }catch(error){
         res.json({success:false, message:error.message})
     }
}

const listproducts = async (req, res)=>{
     
    try{
        const lists = await productmodel.find({});

        res.json({success:true, message:lists});

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

const singleproduct = async (req, res)=>{
     try{
        
        const {id} = req.body;
        const product = await productmodel.findById(id);

        res.json({success:true, message:product});
     }catch(error){
         res.json({success:false, message:error.message})
     }
}

export {addproduct, removeproduct, listproducts, singleproduct};