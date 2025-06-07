import jwt from "jsonwebtoken";

const Adminauth = async (req, res, next)=>{
  try{
    const {login} = req.headers;

    if(!login){
        
        return res.json({success:false, message:"Not Authorized Login Again"});
    }

    const decodetoken = jwt.verify(login, process.env.JWT_SECRET_KEY);

    if(decodetoken.id !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
        return res.json({success:false, message:"Not Authorized Login Again"})
    }

    next();

  }catch(error){
    res.json({success:false, message:error.message});
  }
}

export default Adminauth;